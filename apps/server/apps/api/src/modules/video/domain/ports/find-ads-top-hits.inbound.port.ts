import { TFindAdsTopHits } from '@Apps/modules/video/application/queries/v1/find-ads-top-hits.query-handler';
import { FindAdsTopHitsDto } from '@Apps/modules/video/application/dtos/find-ads-top-hits.dto';

export interface FindAdsTopHitsInboundPort {
  execute(dto: FindAdsTopHitsDto): Promise<TFindAdsTopHits>;
}
