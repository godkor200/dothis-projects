import { Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export interface VideoData {
  video_id: string;
  year_p: number;
  video_tags: string[];
  video_category: string;
  video_title: string;
  video_info_card: number;
  video_duration: number;
  video_cluster: number;
  '@timestamp': string; // ISO 8601 문자열
  month_p: number;
  channel_id: string;
  video_description: string;
  use_text: string[] | null;
  video_published: string; // ISO 8601 문자열
  '@version': string;
  video_end_screen: number;
  video_with_ads: number;
  day_p: number;
}
export interface VideoDataExtendVideoViews extends VideoData {
  video_views: number;
  channel_name: string;
}

export type VideoDataResult = Result<VideoData[], VideoNotFoundError>;

export interface VideoDataOutboundPort {
  execute(videoIds: string[]): Promise<VideoDataResult>;
}
