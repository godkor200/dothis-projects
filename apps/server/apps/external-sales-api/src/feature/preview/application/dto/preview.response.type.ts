import { createZodDto } from '@anatine/zod-nestjs';
import { getApiResponse } from '@Libs/types';

export interface InputData {
  video_id: string;
}

export interface VideoData {
  video_id: string;
  channel_id: string;
  video_title: string;
  video_description: string;
  video_tags: string; // 실제로는 배열의 JSON 문자열이므로 나중에 파싱 필요
  video_duration: number;
  video_published: string;
  video_category: string;
  video_info_card: number;
  video_with_ads: number;
  video_end_screen: number;
  video_cluster: number;
  video_comments: number;
  video_views: number;
  video_likes: number;
  video_performance: number;
}

export interface ChannelData {
  channel_id: string;
  channel_name: string;
  channel_description: string;
  channel_url: string;
  channel_tags: string;
  mainly_used_keywords: string;
  mainly_used_tags: string;
  channel_country: string | null;
  channel_link: string | null;
  channel_since: string;
  channel_cluster: number;
  channel_thumbnail: string;
  channel_total_videos: number;
  channel_subscribers: number;
  channel_average_views: number;
  channel_total_views: number;
}

export interface CrawledData {
  video_data: VideoData;
  channel_data: ChannelData;
}

export interface fetchDataApiResponse extends getApiResponse<CrawledData> {
  input_data: InputData;
  crawled_date: string;
}
