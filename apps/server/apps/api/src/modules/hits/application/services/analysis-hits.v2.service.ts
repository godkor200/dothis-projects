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
  GetVideoHistoryGetMultipleByIdV2Dao,
} from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { IGetVideoHistoryGetMultipleByIdV2OutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { ChannelHistoryByChannelIdOutboundPort } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';
import { CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { VideoAggregateService } from '@Apps/modules/video/application/service/helpers/video.aggregate.service';
import { Err, Ok } from 'oxide.ts';
import { VideoHelper } from '@Apps/modules/video/application/service/helpers/video.helper';

export class AnalysisHitsV2Service implements AnalysisHitsServiceV2InboundPort {
  constructor(
    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCache: VideoCacheOutboundPorts,
    @Inject(VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN)
    private readonly videoHistoryAdapter: IGetVideoHistoryGetMultipleByIdV2OutboundPort,
    @Inject(CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN)
    private readonly getChannelHistoryByChannelId: ChannelHistoryByChannelIdOutboundPort,
  ) {}

  async execute(dto: GetAnalysisHitsV2Dto): Promise<TAnalysisHitsServiceRes> {
    console.time('execute 함수 실행 시간');
    const dao = new GetVideoCacheDao(dto);
    try {
      console.time('비디오 캐시 조회 시간');
      const videoCache = await this.videoCache.execute(dao);
      console.timeEnd('비디오 캐시 조회 시간');

      const videoHistoryDao = new GetVideoHistoryGetMultipleByIdV2Dao({
        videoIds: videoCache,
        from: dao.from,
        to: dao.to,
      });
      console.time('비디오 히스토리 조회 시간');
      const videoHistoryPromise =
        this.videoHistoryAdapter.execute(videoHistoryDao);
      console.timeEnd('비디오 히스토리 조회 시간');

      console.time('채널 히스토리 조회 시간');
      const channelHistoryDao = new GetChannelHistoryByChannelIdV2Dao({
        channelIds: videoCache,
      });
      const channelHistoryPromise =
        this.getChannelHistoryByChannelId.execute(channelHistoryDao);
      console.timeEnd('채널 히스토리 조회 시간');

      console.time('비동기 작업 병렬 처리 시간');
      const [videoHistoryResult, channelHistoryResult] = await Promise.all([
        videoHistoryPromise,
        channelHistoryPromise,
      ]);
      console.timeEnd('비동기 작업 병렬 처리 시간');

      if (videoHistoryResult.isOk() && channelHistoryResult.isOk()) {
        console.time('조인작업 작업 처리 시간');
        const videoHistoriesResult = videoHistoryResult.unwrap();
        const channelHistoriesResult = channelHistoryResult.unwrap();
        const mergedVideoHistory = VideoHelper.mergeVideoData(
          videoCache,
          channelHistoriesResult,
          videoHistoriesResult,
        );

        const groupedData =
          VideoAggregateService.groupDataByDate(mergedVideoHistory);

        const res = VideoAggregateService.calculateMetrics(groupedData);
        console.timeEnd('조인작업 작업 처리 시간');
        console.timeEnd('execute 함수 실행 시간');
        return Ok({ success: true, data: res });
      }
      if (videoHistoryResult.isErr()) {
        return Err(videoHistoryResult.unwrapErr());
      }
      return Err(channelHistoryResult.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
