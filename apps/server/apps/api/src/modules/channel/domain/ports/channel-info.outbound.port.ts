import { Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

export interface ChannelInfoResult {
  channel_total_videos: number;
  channel_total_views: number;
  channel_average_views: number;
  channel_subscribers: number;
}
export type TChannelInfoResult = Result<
  ChannelInfoResult[],
  ChannelNotFoundError
>;
export interface ChannelInfoOutboundPort {
  execute(channelId: string): Promise<TChannelInfoResult>;
}
