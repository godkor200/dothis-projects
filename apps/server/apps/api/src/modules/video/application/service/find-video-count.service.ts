import { findVideoCountByDateServiceInboundPort } from '@Apps/modules/video/domain/ports/find-video-count.inbound.port';
import { FindVideoCountDto } from '@Apps/modules/video/application/dtos/find-video-count.dto';
import { TFindVideoCount } from '@Apps/modules/video/application/queries/v1/find-video-count.query-handler';
import { Err, Ok } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { VIDEO_PUBILSHED_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoPubilshedOutboundPort } from '@Apps/modules/video/domain/ports/video.pubilshed.outbound.port';

export class FindVideoCountService
  implements findVideoCountByDateServiceInboundPort
{
  constructor(
    @Inject(VIDEO_PUBILSHED_ADAPTER_DI_TOKEN)
    private readonly videoPubilshedAdapter: VideoPubilshedOutboundPort,
  ) {}

  async execute(dto: FindVideoCountDto): Promise<TFindVideoCount> {
    try {
      const counts = await this.videoPubilshedAdapter.execute({
        search: dto.search,
        related: dto.related,
        from: dto.from,
        to: dto.to,
      });
      if (counts.isOk()) {
        const countUnwrap = counts.unwrap();
        return Ok(
          countUnwrap.map((e) => ({
            date: e.key_as_string,
            number: e.doc_count,
          })),
        );
      }
    } catch (e) {
      return Err(e);
    }
  }
}
