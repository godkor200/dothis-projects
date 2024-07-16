import { GetVideoDataPageV2ServiceInboundPort } from '@Apps/modules/video/domain/ports/get-video-data-page.service.inbound.port';
import { GetVideoPaginatedPageSortDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { TGetVideoPage } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';
import { Inject } from '@nestjs/common';
import {
  VIDEO_CACHE_ADAPTER_DI_TOKEN,
  VIDEO_CACHE_PAGINAED_ADAPTER_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideoCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { IGetVideoVideoNoKeywordPaginatedOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoNoKeywordPaginatedDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Err, Ok } from 'oxide.ts';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import { VideoFetchHelper } from '@Apps/modules/video/application/service/helpers/video.fetch.helper';

export class GetVideoDataV2PaginatedService
  implements GetVideoDataPageV2ServiceInboundPort
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,

    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCacheService: VideoCacheOutboundPorts,

    @Inject(VIDEO_CACHE_PAGINAED_ADAPTER_DI_TOKEN)
    private readonly videoPaginatedService: IGetVideoVideoNoKeywordPaginatedOutboundPort,
  ) {}

  async execute(dto: GetVideoPaginatedPageSortDto): Promise<TGetVideoPage> {
    try {
      const keywordInfo = await this.relWordsRepository.findOneByKeyword(
        dto.search,
      );
      if (keywordInfo.isErr()) {
        return Err(new KeywordsNotFoundError());
      }
      const keywordInfoUnwrap = keywordInfo.unwrap();
      const relatedCluster = keywordInfoUnwrap.cluster
        .split(',')
        .map((e) => e.trim());

      const videoCacheDao = new GetVideoCacheDao({ ...dto, relatedCluster });

      const videoCacheResult = await this.videoCacheService.execute(
        videoCacheDao,
      );

      if (videoCacheResult.isOk()) {
        const { from, to, order, sort, page, limit } = dto;
        const withinRange = VideoFetchHelper.isDateWithinRange(
          videoCacheResult.unwrap(),
          from,
          to,
        );
        const videoCacheResultUnwrap = RedisResultMapper.groupByCluster(
          RedisResultMapper.toObjects(withinRange),
        );
        const videoPaginatedDao = new VideoNoKeywordPaginatedDao({
          videoIds: videoCacheResultUnwrap,
          from,
          to,
          sort,
          order,
          limit,
          page,
        });

        const res = await this.videoPaginatedService.execute(videoPaginatedDao);

        if (res.isOk()) {
          return Ok({
            total: withinRange.length,
            data: res.unwrap(),
          });
        } else {
          return Err(res.unwrapErr());
        }
      }
    } catch (e) {
      return Err(e);
    }
  }
}
