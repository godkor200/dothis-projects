import {
  AnalysisHitsServiceV2InboundPort,
  TAnalysisHitsServiceRes,
} from '@Apps/modules/hits/domain/ports/analysis-hits.service.inbound.port';
import { GetAnalysisHitsV2Dto } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { VideoCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { Inject } from '@nestjs/common';
import { VIDEO_CACHE_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import {
  GetChannelHistoryByChannelIdV2Dao,
  GetVideoHistoryMultipleByIdV2Dao,
} from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { IGetVideoHistoryGetMultipleByIdV2OutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { ChannelHistoryByChannelIdOutboundPort } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';
import { CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { Err, Ok } from 'oxide.ts';
import { VideoDataMapper } from '@Apps/modules/video/application/mapper/video-data.mapper';
import { VideoAggregateHelper } from '@Apps/modules/video/application/service/helpers/video.aggregate.helper';
import { VideoAggregateUtils } from '@Apps/modules/video/application/service/helpers/video.aggregate.utils';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

/**
 * 시퀀스
 * 예를 들어 2024년 05월 01일 부터 05월 06일까지 산출한다면
 * history를 2024년 04월 30일부터 불러와서 05월 01일과 일일조회수를 계산하고
 * 5/1과 5/2를 뺴서 5/2일짜 일일조회수를 계산하고
 * 5/2과 5/3를 뺴서 5/3일짜 일일조회수를 계산하고
 * 5/3과 5/4를 뺴서 5/4일을 계산하고
 * ...
 * 5/5과 5/6일을 뺴서 5/6일을 계산하기 떄문
 */
export class AnalysisHitsV2Service implements AnalysisHitsServiceV2InboundPort {
  constructor(
    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCacheService: VideoCacheOutboundPorts,
    @Inject(VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN)
    private readonly videoHistoryService: IGetVideoHistoryGetMultipleByIdV2OutboundPort,
    @Inject(CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN)
    private readonly channelHistoryService: ChannelHistoryByChannelIdOutboundPort,
  ) {}

  async execute(dto: GetAnalysisHitsV2Dto): Promise<TAnalysisHitsServiceRes> {
    const videoCacheDao = new GetVideoCacheDao(dto);
    try {
      const videoCacheResult = await this.videoCacheService.execute(
        videoCacheDao,
      );
      if (videoCacheResult.isOk()) {
        const videoCacheResultUnwrap = videoCacheResult.unwrap();
        if (!Object.keys(videoCacheResultUnwrap).length)
          return Err(new VideoNotFoundError());
        const videoHistoryDao = new GetVideoHistoryMultipleByIdV2Dao({
          videoIds: videoCacheResultUnwrap,
          from: videoCacheDao.from,
          to: videoCacheDao.to,
        });

        const videoHistoryResultPromise =
          this.videoHistoryService.execute(videoHistoryDao);
        const channelHistoryDao = new GetChannelHistoryByChannelIdV2Dao({
          channelIds: videoCacheResultUnwrap,
        });
        const channelHistoryResultPromise =
          this.channelHistoryService.execute(channelHistoryDao);
        const [videoHistoryResult, channelHistoryResult] = await Promise.all([
          videoHistoryResultPromise,
          channelHistoryResultPromise,
        ]);
        if (videoHistoryResult.isOk() && channelHistoryResult.isOk()) {
          const videoHistories = videoHistoryResult.unwrap();

          const channelHistories = channelHistoryResult.unwrap();
          const mergedVideoHistory = VideoDataMapper.mergeVideoData(
            videoCacheResultUnwrap,
            videoHistories,
            channelHistories,
          );

          if (dto.separation) {
            const groupDataByCluster = VideoAggregateUtils.groupBy(
              mergedVideoHistory,
              (history) => history.videoCluster,
            );
            const result = Object.entries(groupDataByCluster).map(
              ([clusterNumber, clusterData]) => {
                const metrics =
                  VideoAggregateHelper.calculateMetrics(clusterData);

                return {
                  clusterNumber: Number(clusterNumber),
                  data: metrics,
                };
              },
            );
            return Ok({ success: true, data: result });
          }
          const dateGroupedData =
            VideoAggregateUtils.groupDataByDate(mergedVideoHistory);
          const metrics = VideoAggregateHelper.calculateMetrics(
            Object.values(dateGroupedData).flat(),
          );
          return Ok({
            success: true,
            data: VideoAggregateUtils.generateDailyFakeViewsAndExpectedViews(
              dto.from,
              dto.to,
              metrics,
            ),
          });
        }
        if (videoHistoryResult.isErr()) {
          return Err(videoHistoryResult.unwrapErr());
        }
        return Err(channelHistoryResult.unwrapErr());
      }
      return Err(videoCacheResult.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
