import { FindAdsInfoDto } from '@Apps/modules/video/application/dtos/find-ads-info.dtos';
import { TFindAdsInfoRes } from '@Apps/modules/video/application/queries/v1/find-ads-info.query-handler';

export interface FindAdsInfoInboundPort {
  execute(dto: FindAdsInfoDto): Promise<TFindAdsInfoRes>;
}
