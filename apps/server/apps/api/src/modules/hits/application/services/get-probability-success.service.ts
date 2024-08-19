import { GetProbabilitySuccessInboundPort } from '@Apps/modules/hits/domain/ports/get-probability-success.inbound.port';
import { GetProbabilitySuccessDto } from '@Apps/modules/hits/application/dtos/get-probability-success.dto';
import {
  GetProbabilityRes,
  TGetProbabilityRes,
} from '@Apps/modules/hits/application/queries/get-probability-success.query-handler';
import { Inject } from '@nestjs/common';
import { ChannelHistoryByChannelIdOutboundPort } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';
import { CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { Err, Ok } from 'oxide.ts';
import { VIDEO_CACHE_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import { VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { IGetVideoHistoryGetMultipleByIdV2OutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { VideoDataServiceHelper } from '@Apps/common/helpers/get-video-data.helper';

export class GetProbabilitySuccessService
  implements GetProbabilitySuccessInboundPort
{
  private readonly dataHelper: VideoDataServiceHelper;

  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,

    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCacheService: VideoCacheOutboundPorts,

    @Inject(VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN)
    private readonly videoHistoryService: IGetVideoHistoryGetMultipleByIdV2OutboundPort,

    @Inject(CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN)
    private readonly channelHistoryService: ChannelHistoryByChannelIdOutboundPort,
  ) {
    this.dataHelper = new VideoDataServiceHelper(
      relWordsRepository,
      videoCacheService,
      videoHistoryService,
      channelHistoryService,
    );
  }

  async execute(dto: GetProbabilitySuccessDto): Promise<TGetProbabilityRes> {
    try {
      const relatedCluster = await this.dataHelper.getKeywordClusters(
        dto.search,
      );
      const relatedClusterUnwrap = relatedCluster.unwrap();

      const mergedVideoHistory =
        await this.dataHelper.getVideoCacheAndHistories(
          relatedClusterUnwrap,
          dto,
        );
      if (mergedVideoHistory.isOk()) {
        const mergedVideoHistoryUnwrap = mergedVideoHistory.unwrap();

        let countAboveAverage = 0;
        mergedVideoHistoryUnwrap.forEach((item) => {
          if (item.videoViews > item.channelAverageViews) {
            countAboveAverage++;
          }
        });
        const successProbability: GetProbabilityRes = {
          totalVideoCount: Object.values(mergedVideoHistoryUnwrap).flat()
            .length,
          countAboveAverage: countAboveAverage,
        };

        // 결과값으로 총 비디오 갯수와 평균 이상인 비디오의 갯수를 리턴
        return Ok({ success: true, data: successProbability });
      }
    } catch (e) {
      return Err(e);
    }
  }
}
