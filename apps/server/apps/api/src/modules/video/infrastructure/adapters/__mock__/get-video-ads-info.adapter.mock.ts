import { IGetVideoAdsInfoAdapterOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { TFindAdsInfoRes } from '@Apps/modules/video/application/queries/v1/find-ads-info.query-handler';
import { Ok, Err } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

export class MockGetVideoAdsInfoAdapter
  implements IGetVideoAdsInfoAdapterOutboundPort
{
  async execute(dao): Promise<TFindAdsInfoRes> {
    // Mock response logic. Customize as needed.
    if (dao) {
      return Ok({
        success: true,
        data: [{ numberOfAdVideos: 0, averageViewCount: 0, totalVideos: 0 }],
      });
    } else {
      return Err(new VideoHistoryNotFoundError()); // Simulate an error
    }
  }
}
