import { Result } from 'oxide.ts';

export type CrawledVideoRepositoryRes = Result<
  ICrawledVideoRepositoryRes[],
  any
>;
export interface ICrawledVideoRepositoryRes {
  video_id: string;
  channel_id: string;
  video_title: string;
  video_description: string;
  video_tags: string; // assuming this is a serialized array, if it's actually an array, use string[]
  video_duration: number;
  video_published: string; // could use Date if you parse it
  video_category: string;
  video_info_card: number;
  video_with_ads: number;
  video_end_screen: number;
  video_cluster: number;
  crawled_date: string; // could use Date if you parse it
  year: number;
  month: number;
  day: number;
  CHANNEL_ID: string;
  CHANNEL_NAME: string;
  CHANNEL_DESCRIPTION: string;
  CHANNEL_TAGS: string; // assuming this is a serialized array, if it's actually an array, use string[]
  MAINLY_USED_KEYWORDS: string;
  MAINLY_USED_TAGS: string;
  CHANNEL_COUNTRY: string;
  CHANNEL_LINK: string;
  CHANNEL_SINCE: string; // could use Date if you parse it
  CHANNEL_CLUSTER: number;
  CRAWLED_DATE: string | null; // could use Date if you parse it
  USER_ID: string | null;
  channel_id_part: string;
  CHANNEL_THUMBNAIL: string;
  video_views: number;
  video_likes: number;
  video_comments: number;
  video_performance: number;
  channel_average_views: number;
  channel_subscribers: number;
  channel_total_views: string;
  channel_total_videos: number;
}

export class CrawledVideoRepositoryDao {
  videoIds: string[];
  year: number;
  month: number;
  day: number;
  constructor(props: CrawledVideoRepositoryDao) {
    Object.assign(this, props);
  }
}

export interface ICrawledVideoRepositoryPort {
  get(dao: CrawledVideoRepositoryDao): Promise<CrawledVideoRepositoryRes>;
}
