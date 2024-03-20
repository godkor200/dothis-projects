import { FindAdsInfoInboundPort } from '@Apps/modules/video/domain/ports/find-ads-info.inbound.port';
import { FindAdsInfoDto } from '@Apps/modules/video/application/dtos/find-ads-info.dtos';
import { TFindAdsInfoRes } from '@Apps/modules/video/application/queries/v1/find-ads-info.query-handler';
import { VIDEO_GET_ADS_INFO_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { GetAdsInfoResDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { IGetVideoAdsInfoAdapterOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { Inject } from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';

export class FindAdsInfoService implements FindAdsInfoInboundPort {
  constructor(
    @Inject(VIDEO_GET_ADS_INFO_DI_TOKEN)
    private readonly getVideoAdsInfoAdapter: IGetVideoAdsInfoAdapterOutboundPort,
  ) {}
  async execute(dto: FindAdsInfoDto): Promise<TFindAdsInfoRes> {
    try {
      const dao = new GetAdsInfoResDao(dto);
      const result = await this.getVideoAdsInfoAdapter.execute(dao);
      if (result.isOk()) {
        return Ok({ success: true, data: result.unwrap() });
      }
      return Err(result.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
