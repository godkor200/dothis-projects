export interface IFindVideoHistoryResponse {
  video_id: string;
  video_views: number;
  video_likes: number;
  video_comments: number;
  crawled_date: string;
  channel_id: string;
  performance?: number;
}

export interface IinnerHitVideoHistory<T> {
  video_history: T;
}
