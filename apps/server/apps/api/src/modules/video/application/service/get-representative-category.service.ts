import { VideoHistoryCategoryOutbound } from '@Apps/modules/video-history/domain/ports/video-history.category.outbound.port';
import { Inject } from '@nestjs/common';
import { REPRESENTATIVE_CATEGORY_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import {
  GetRepresentativeCategoryInboundPort,
  TRepresentativeCategory,
} from '@Apps/modules/video/domain/ports/get-representative-category.inbound.port';
import { GetRepresenativeCategoryDto } from '@Apps/modules/video/application/dtos/get-represenative-category.dto';
import { Err, Ok } from 'oxide.ts';

export class GetRepresentativeCategoryService
  implements GetRepresentativeCategoryInboundPort
{
  constructor(
    @Inject(REPRESENTATIVE_CATEGORY_DI_TOKEN)
    private readonly videoHistoryCategoryAdapter: VideoHistoryCategoryOutbound,
  ) {}
  async execute(
    dto: GetRepresenativeCategoryDto,
  ): Promise<TRepresentativeCategory> {
    try {
      const agg = await this.videoHistoryCategoryAdapter.execute(dto);
      if (agg.isOk()) {
        const aggUnwrapped = agg.unwrap();

        return Ok({
          representativeCategory: aggUnwrapped[0].cluster,
        });
      }
    } catch (err) {
      return Err(err);
    }
  }
}
