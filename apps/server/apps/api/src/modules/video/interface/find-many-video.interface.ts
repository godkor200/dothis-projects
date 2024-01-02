import { IFindVideoHistoryResponse } from '@Apps/modules/video_history/interface/find-video.history.res';

export interface IFindManyVideoResult {
  _index: string;
  _id: string;
  _score: number;
  _source: IVideo;
}
export interface IPagingRes {
  total: { value: number; relation: string };
  data: IFindManyVideoResult[];
}
export interface IVideo {
  video_id: string;
  channel_id: string;
  channel_name?: string;
  video_title: string;
  video_url: string;
  video_description: string;
  video_duration: number;
  video_published: string;
  video_tags: string;
  video_category: string;
  video_info_card: number;
  video_with_ads: number;
  video_end_screen: number;
  crawled_date: string;
  video_history: IFindVideoHistoryResponse[];
}
