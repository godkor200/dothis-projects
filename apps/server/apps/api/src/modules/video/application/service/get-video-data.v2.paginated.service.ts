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

export class GetVideoDataV2PaginatedService
  implements GetVideoDataPageV2ServiceInboundPort
{
  constructor(
    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCacheService: VideoCacheOutboundPorts,

    @Inject(VIDEO_CACHE_PAGINAED_ADAPTER_DI_TOKEN)
    private readonly videoPaginatedService: IGetVideoVideoNoKeywordPaginatedOutboundPort,
  ) {}

  async execute(dto: GetVideoPaginatedPageSortDto): Promise<TGetVideoPage> {
    const videoCacheDao = new GetVideoCacheDao(dto);
    try {
      const videoCacheResult = await this.videoCacheService.execute(
        videoCacheDao,
      );

      if (videoCacheResult.isOk()) {
        const { from, to, order, sort, page, limit } = dto;
        const videoCacheResultUnwrap = videoCacheResult.unwrap();
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
            total: Object.values(videoCacheResultUnwrap).reduce(
              (acc, current) => acc + current.length,
              0,
            ),
            data: res.unwrap(),
          });
        }
      }
    } catch (e) {
      return Err(e);
    }
  }
}
