import {
  IGetVideoAdsTopHitsAdapterOutboundPort,
  TFindAdsTopHitsRepoRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoAdsTopHitsDao } from '@Apps/modules/video/infrastructure/daos/video.dao';

export class MockGetTopHitsVideoAdapter
  implements IGetVideoAdsTopHitsAdapterOutboundPort
{
  async execute(dao: GetVideoAdsTopHitsDao): Promise<TFindAdsTopHitsRepoRes> {}
}
