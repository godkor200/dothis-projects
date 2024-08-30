import { IGetChannelHistoryLatestTupleByVideoAdapter } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';
import { FindIndividualVideoInfoV1Dao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { TChannelHistoryTuplesRes } from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';
import { Err, Ok } from 'oxide.ts';

export class MockGetChannelHistoryLastestAdapter
  implements IGetChannelHistoryLatestTupleByVideoAdapter
{
  async execute(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryTuplesRes> {
    // Mock response logic. Customize as needed.
    return Ok([
      {
        channelId: 'string',
        channelAverageViews: 0,
        channelSubscribers: 0,
        channelTotalViews: 0,
        channelTotalVideos: 0,
        videoPublished: '2222',
        videoTags: '[]',
        year: 2024,
        month: 2,
        day: 12,
      },
    ]); // Return mock data
  }
}
