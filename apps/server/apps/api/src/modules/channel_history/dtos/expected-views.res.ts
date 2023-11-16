import { IFindVideoHistoryResponse } from '@Apps/modules/video_history/interface/find-video.history.res';

export interface IChannelHistoryRes {
  channel_id: string;
  channel_subscribers: number;
  channel_total_views: number;
  channel_total_videos: number;
  channel_average_views: number;
  crawled_date: string;
}

export interface IChannelExpViewsRes
  extends Pick<
    IChannelHistoryRes,
    'channel_id' | 'channel_average_views' | 'crawled_date'
  > {}

export interface IVideoHistoryRes
  extends Pick<
    IFindVideoHistoryResponse,
    'video_id' | 'video_views' | 'crawled_date'
  > {}
