import {
  AnalysisHitsServiceV2InboundPort,
  TAnalysisHitsServiceRes,
} from '@Apps/modules/hits/domain/ports/analysis-hits.service.inbound.port';
import { GetAnalysisHitsV2Dto } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { VideoCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { Inject } from '@nestjs/common';
import { VIDEO_CACHE_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';

import { Err, Ok } from 'oxide.ts';
import { VideoAggregateHelper } from '@Apps/modules/video/application/service/helpers/video.aggregate.helper';
import { VideoAggregateUtils } from '@Apps/modules/video/application/service/helpers/video.aggregate.utils';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import {
  KeywordServiceHelper,
  VideoDataServiceHelper,
} from '@Apps/common/helpers/get-video-data.helper';

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
  private readonly dataHelper: VideoDataServiceHelper;

  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,
    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCacheService: VideoCacheOutboundPorts, // @Inject(VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN) // private readonly videoHistoryService: IGetVideoHistoryGetMultipleByIdV2OutboundPort, // @Inject(CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN) // private readonly channelHistoryService: ChannelHistoryByChannelIdOutboundPort,
  ) {
    this.dataHelper = new KeywordServiceHelper(relWordsRepository);
  }

  async execute(dto: GetAnalysisHitsV2Dto): Promise<TAnalysisHitsServiceRes> {
    try {
      const relatedCluster = await this.dataHelper.getClusters(dto.search);
      const relatedClusterUnwrap = relatedCluster.unwrap();

      const mergedVideoHistory =
        await this.dataHelper.getVideoCacheAndHistories(
          relatedClusterUnwrap,
          dto,
        );
      if (mergedVideoHistory.isOk()) {
        const mergedVideoHistoryUnwrap = mergedVideoHistory.unwrap();
        if (dto.separation) {
          const groupDataByCluster = VideoAggregateUtils.groupBy(
            mergedVideoHistoryUnwrap,
            (history) => history.videoCluster,
          );
          const result = Object.entries(groupDataByCluster).map(
            ([clusterNumber, clusterData]) => {
              const metrics =
                VideoAggregateHelper.calculateMetrics(clusterData);

              return {
                clusterNumber: Number(clusterNumber),
                data: VideoAggregateUtils.generateDailyFakeViewsAndExpectedViews(
                  dto.from,
                  dto.to,
                  metrics,
                ),
              };
            },
          );
          return Ok({ success: true, data: result });
        }
        const dateGroupedData = VideoAggregateUtils.groupDataByDate(
          mergedVideoHistoryUnwrap,
        );
        const metrics = VideoAggregateHelper.calculateMetrics(
          Object.values(dateGroupedData).flat(),
        );

        return Ok({
          success: true,
          data: {
            clusterNumber: null,
            data: VideoAggregateUtils.generateDailyFakeViewsAndExpectedViews(
              dto.from,
              dto.to,
              metrics,
            ),
          },
        });
      }
      return Err(mergedVideoHistory.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
