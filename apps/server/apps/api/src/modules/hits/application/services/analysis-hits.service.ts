import {
  AnalysisHitsServiceInboundPort,
  TAnalysisHitsServiceRes,
} from '@Apps/modules/hits/domain/ports/analysis-hits.service.inbound.port';
import { GetAnalysisHitsDto } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { Inject } from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';

import { KeywordServiceHelper } from '@Apps/common/helpers/get-video-data.helper';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VIDEO_CACHE_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';

/**
 * api: 데일리뷰와 기대조회수 병합
 *
 */
export class AnalysisHitsService implements AnalysisHitsServiceInboundPort {
  private readonly dataHelper: KeywordServiceHelper;
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,

    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCacheService: VideoCacheOutboundPorts,
  ) {
    this.dataHelper = new KeywordServiceHelper(relWordsRepository);
  }
  async execute(dto: GetAnalysisHitsDto): Promise<TAnalysisHitsServiceRes> {
    try {
      const relatedCluster = await this.dataHelper.getClusters(dto.search);
      const relatedClusterUnwrap = relatedCluster.unwrap();
      const videoCacheDao = new GetVideoCacheDao({
        ...dto,
        relatedCluster: relatedClusterUnwrap,
      });

      const videoCacheResult = await this.videoCacheService.execute(
        videoCacheDao,
      );

      if (videoCacheResult.isOk()) {
        const videos = RedisResultMapper.groupByCluster(
          RedisResultMapper.toObjects(videoCacheResult.unwrap()),
        );
        if (!Object.values(videos).flat().length) {
          return Err(new VideoNotFoundError());
        }

        console.log(videos);
      }

      // if (data.isOk()) {
      //   const dataUnwrap = data.unwrap();
      //   const metrics = VideoAggregateHelper.calculateMetrics(dataUnwrap);
        return Ok({ success: true, data: [] });

    } catch (err) {
      return Err(err);
    }
  }
}
