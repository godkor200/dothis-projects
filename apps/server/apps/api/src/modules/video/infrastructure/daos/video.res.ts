export interface IRelatedVideoAndVideoHistoryAdapterRes {
  videoId: string;
  videoViews: string;
  date: string;
}
export class GetRelatedVideoAndVideoHistory {}

export interface IVideoSchema {
  videoId: string;
  channelId: string;
  videoTitle: string;
  videoDescription: string;
  videoTags: string;
  videoDuration: number;
  videoPublished: Date;
  videoCategory: string;
  videoInfoCard: boolean;
  videoWithAds: boolean;
  videoEndScreen: boolean;
  videoCluster: number;
  crawledDate: Date;
  year: number;
  month: number;
  day: number;
}
