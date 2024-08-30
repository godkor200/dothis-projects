import { Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
type res = {
  channelId: string;
  channelName: string;
  channelDescription: string;
  channelTags: string;
};
export type ChannelAdapterOutboundResult = Result<res[], ChannelNotFoundError>;

export interface ChannelAdapterOutboundPort {
  execute(ids: string[]): Promise<ChannelAdapterOutboundResult>;
}
