import {
  ChannelHistoryByChannelIdOutboundPort,
  TChannelHistoryByChannelIdRes,
} from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';
import { GetChannelHistoryByChannelIdV2Dao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Ok } from 'oxide.ts';

export class MockGetChannelHistoryByIdAdapter
  implements ChannelHistoryByChannelIdOutboundPort
{
  async execute(
    dao: GetChannelHistoryByChannelIdV2Dao,
  ): Promise<TChannelHistoryByChannelIdRes> {
    return Ok([
      {
        channelId: 'cccccc',
        channelSubscribers: 2222,
        channelAverageViews: 2222,
        day: 2024,
        month: 8,
        year: 19,
      },
    ]);
  }
}
