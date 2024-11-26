import { Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

type res = {
  channelId: string;
  channelName: string;
  channelDescription: string;
  channelTags: string;
  channelThumbnail: string;
  mainlyUsedTags?: string; // "mainly_used_tags"
  channelSince: string; // "channel_since"
  channelCluster: number; // "channel_cluster"
  channelIdPart: string; // "channel_id_part"
  channelCountry: string; // "channel_country"
  crawledDate: Date; // "crawled_date"
  mainlyUsedKeywords?: string; // "mainly_used_keywords"
  channelLink?: string; // "channel_link"
  version?: string; // "@version"
  userId?: number; // "user_id"
};
export type ChannelAdapterOutboundResult = Result<res[], ChannelNotFoundError>;

export interface ChannelAdapterOutboundPort {
  execute(ids: string[]): Promise<ChannelAdapterOutboundResult>;
}
