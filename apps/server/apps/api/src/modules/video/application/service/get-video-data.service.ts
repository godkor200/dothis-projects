import { Inject } from '@nestjs/common';
import {
  VIDEO_ENTIRE_COUNT_IGNITE_DI_TOKEN,
  VIDEO_IGNITE_DI_TOKEN,
  VIDEO_PAGINATED_IGNITE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import {
  IGetRelatedVideosEntireCountOutBoundPort,
  IGetRelatedVideosPaginatedOutBoundPort,
  VideoOutboundPort,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoPaginatedPageDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { TGetVideoPage } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';
import { GetVideoDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { GetVideoDataPageServiceInboundPort } from '@Apps/modules/video/domain/ports/get-video-data-page.service.inbound.port';
import { Err, Ok } from 'oxide.ts';

export class GetVideoDataPageService
  implements GetVideoDataPageServiceInboundPort
{
  constructor(
    @Inject(VIDEO_PAGINATED_IGNITE_DI_TOKEN)
    private readonly getRelatedVideosPaginated: IGetRelatedVideosPaginatedOutBoundPort,

    @Inject(VIDEO_ENTIRE_COUNT_IGNITE_DI_TOKEN)
    private readonly getRelatedVideosEntireCount: IGetRelatedVideosEntireCountOutBoundPort,
  ) {}

  async execute(dto: GetVideoPaginatedPageDto): Promise<TGetVideoPage> {
    const dao = new GetVideoDao(dto);
    const entireCount = await this.getRelatedVideosEntireCount.execute(dao);
    const data = await this.getRelatedVideosPaginated.execute(dao);

    if (data.isOk() && entireCount.isOk()) {
      return Ok({
        total: entireCount
          .unwrap()
          .reduce(
            (acc, numberArray) =>
              acc + Number(numberArray.map((count) => count)),
            0,
          ),
        data: data.unwrap(),
      });
    } else {
      return Err(entireCount.unwrapErr() || data.unwrapErr());
    }
  }
}
