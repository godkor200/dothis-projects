export interface IFindManyVideoResult {
  _index: string;
  _id: string;
  _score: number;
  _source: {
    video_id: string;
    channel_id: string;
    video_title: string;
    video_url: string;
    video_description: string;
    video_duration: number;
    video_published: string;
    video_tag: string;
    video_category: string;
    video_info_card: number;
    video_with_ads: number;
    video_end_screen: number;
    crawled_date: string;
  };
}
export interface IPagingRes {
  total: { value: number; relation: string };
  data: IFindManyVideoResult[];
}
