import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { Result } from 'oxide.ts';
import { ChannelHistoryLatestDayTupleRes } from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';

export type TChannelHistoryByChannelIdRes = Result<
  IChannelHistoryByChannelIdRes[],
  TableNotFoundException | ChannelHistoryNotFoundError
>;

export interface IChannelHistoryByChannelIdRes
  extends Pick<
    ChannelHistoryLatestDayTupleRes,
    'channelId' | 'channelSubscribers' | 'channelAverageViews'
  > {}

export interface ChannelHistoryByChannelIdOutboundPort {
  execute(ids: string[]): Promise<TChannelHistoryByChannelIdRes>;
}
