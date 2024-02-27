import { Inject } from '@nestjs/common';
import { VIDEO_IGNITE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoPaginatedPageDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { TGetVideoPage } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';
import { GetVideoDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { VideoInboundPort } from '@Apps/modules/video/domain/ports/video.inbound.port';
import { Err, Ok } from 'oxide.ts';

export class GetVideoDataPageService implements VideoInboundPort {
  constructor(
    @Inject(VIDEO_IGNITE_DI_TOKEN)
    private readonly videoAdapter: VideoOutboundPort,
  ) {}

  async getVideoDataService(
    dto: GetVideoPaginatedPageDto,
  ): Promise<TGetVideoPage> {
    const dao = new GetVideoDao(dto);
    const entireCount = await this.videoAdapter.getRelatedVideosEntireCount(
      dao,
    );
    const data = await this.videoAdapter.getRelatedVideosPaginated(dao);

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
