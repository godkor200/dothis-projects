import { Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

export interface TimelineResult {
  video_id: string;
  video_published: string;
  video_title: string;
}

export type TGetTimelineResult = Result<TimelineResult[], ChannelNotFoundError>;

export interface GetTimelineOutboundPort {
  execute(channelId: string): Promise<TGetTimelineResult>;
}
