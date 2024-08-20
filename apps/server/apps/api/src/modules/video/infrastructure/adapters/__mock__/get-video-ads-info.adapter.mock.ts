import { IGetVideoAdsInfoAdapterOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { TFindAdsInfoRes } from '@Apps/modules/video/application/queries/v1/find-ads-info.query-handler';
import { Ok, Err } from 'oxide.ts';

export class MockGetVideoAdsInfoAdapter
  implements IGetVideoAdsInfoAdapterOutboundPort
{
  async execute(dao): Promise<TFindAdsInfoRes> {
    // Mock response logic. Customize as needed.
    if (dao) {
      return Ok({
        /* mock data */
      }); // Return mock data
    } else {
      return Err(new Error('Mock error')); // Simulate an error
    }
  }
}
