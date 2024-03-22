import { FindAdsTopHitsInboundPort } from '@Apps/modules/video/domain/ports/find-ads-top-hits.inbound.port';
import { FindAdsTopHitsDto } from '@Apps/modules/video/application/dtos/find-ads-top-hits.dto';
import { TFindAdsTopHits } from '@Apps/modules/video/application/queries/v1/find-ads-top-hits.query-handler';
import { Err, Ok } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { VIDEO_GET_ADS_TOP_HITS_IGNITE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { IGetVideoAdsTopHitsAdapterOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoAdsTopHitsDao } from '@Apps/modules/video/infrastructure/daos/video.dao';

export class FindAdsTopHitsService implements FindAdsTopHitsInboundPort {
  constructor(
    @Inject(VIDEO_GET_ADS_TOP_HITS_IGNITE_DI_TOKEN)
    private readonly getVideoAdsTopHitsAdapter: IGetVideoAdsTopHitsAdapterOutboundPort,
  ) {}
  async execute(dto: FindAdsTopHitsDto): Promise<TFindAdsTopHits> {
    const dao = new GetVideoAdsTopHitsDao(dto);

    try {
      const res = await this.getVideoAdsTopHitsAdapter.execute(dao);

      if (res.isOk()) {
        return Ok({ success: true, data: res.unwrap() });
      }
      return Err(res.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
