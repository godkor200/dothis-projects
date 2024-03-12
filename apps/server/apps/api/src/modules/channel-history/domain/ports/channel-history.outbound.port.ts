import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { Result } from 'oxide.ts';

export type TChannelHistoryByChannelIdRes = Result<
  IChannelHistoryByChannelIdRes[],
  TableNotFoundException
>;

export interface IChannelHistoryByChannelIdRes {
  channelId: string;
  channelSubscribers: number;
}

export interface ChannelHistoryByChannelIdOutboundPort {
  execute(ids: string[]): Promise<TChannelHistoryByChannelIdRes>;
}
