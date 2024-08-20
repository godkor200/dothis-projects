import { DailyHitsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { Inject } from '@nestjs/common';
import { VIDEO_CACHE_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import {
  VideoCacheOutboundPorts,
  VideoCacheReturnType,
} from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { FindDailyViewsV2Dto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { Err, Ok } from 'oxide.ts';
import { VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { IGetVideoHistoryGetMultipleByIdV2OutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { GetVideoHistoryMultipleByIdV2Dao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { VideoAggregateHelper } from '@Apps/modules/video/application/service/helpers/video.aggregate.helper';
import { VideoAggregateUtils } from '@Apps/modules/video/application/service/helpers/video.aggregate.utils';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import { KeywordServiceHelper } from '@Apps/common/helpers/get-video-data.helper';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';

export class GetDailyHitsV2Service implements DailyHitsServiceInboundPort {
  private readonly dataHelper: KeywordServiceHelper;

  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,

    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCacheService: VideoCacheOutboundPorts,
  ) //
  // @Inject(VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN)
  // private readonly videoHistoryService: IGetVideoHistoryGetMultipleByIdV2OutboundPort,
  {
    this.dataHelper = new KeywordServiceHelper(relWordsRepository);
  }
  private findClusterWithMostValues(
    data: Record<string, VideoCacheReturnType[]>,
  ): string[] {
    let maxClusterKey = null;
    let maxClusterLength = 0;

    for (const [clusterKey, values] of Object.entries(data)) {
      if (values.length > maxClusterLength) {
        maxClusterKey = clusterKey;
        maxClusterLength = values.length;
      }
    }

    return maxClusterKey;
  }

  async execute(props: FindDailyViewsV2Dto): Promise<TFindDailyView> {
    try {
      const relatedCluster = await this.dataHelper.getClusters(props.search);
      const relatedClusterUnwrap = relatedCluster.unwrap();
      const dao = new GetVideoCacheDao({
        ...props,
        relatedCluster: relatedClusterUnwrap,
      });
      const videoCache = await this.videoCacheService.execute(dao);

      if (videoCache.isOk()) {
        const relatedClusterUnwrap = videoCache.unwrap();
        const videoCacheResultUnwrapped =
          RedisResultMapper.toObjects(relatedClusterUnwrap);
        const groupedVideoCacheResult = RedisResultMapper.groupByCluster(
          videoCacheResultUnwrapped,
        );

        const videoHistoryDao = new GetVideoHistoryMultipleByIdV2Dao({
          videoIds: groupedVideoCacheResult,
          from: props.from,
          to: props.to,
        });

        const videoHistoryResult = await this.videoHistoryService.execute(
          videoHistoryDao,
        );
        if (videoHistoryResult.isOk()) {
          const videoHistoryResultUnwrap = videoHistoryResult.unwrap();
          const res = VideoAggregateHelper.calculateIncreaseByIgnite(
            videoHistoryResultUnwrap,
          );
          return Ok({
            success: true,
            representativeCategory: this.findClusterWithMostValues(
              groupedVideoCacheResult,
            ),
            data: VideoAggregateUtils.generateDailyFakeViews(
              props.from,
              props.to,
              res,
            ),
          });
        }
        return Err(videoHistoryResult.unwrapErr());
      }
      return Err(relatedCluster.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
