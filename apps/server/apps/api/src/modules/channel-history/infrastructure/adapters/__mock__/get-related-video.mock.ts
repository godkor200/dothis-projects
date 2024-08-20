import { IGetChannelHistoryRelateVideoOutboundPort } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';
import {
  FindChannelHistoryRelatedVideoDao,
  TGetRelatedVideoRes,
} from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';
import { Ok } from 'oxide.ts';

export class MockGetRelatedVideo
  implements IGetChannelHistoryRelateVideoOutboundPort
{
  async execute(
    dao: FindChannelHistoryRelatedVideoDao,
  ): Promise<TGetRelatedVideoRes> {
    return Ok([
      {
        videoId: 'video_one',
        videoViews: 0,
        videoLikes: 0,
        videoComments: 0,
        videoPerformance: 0,
        videoCluster: 0,
        year: 2024,
        month: 10,
        day: 1,
      },
    ]);
  }
}
