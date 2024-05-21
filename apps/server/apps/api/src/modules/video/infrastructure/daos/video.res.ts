export interface DateData {
  year: number;
  month: number;
  day: number;
}

export interface IVideoSchema extends DateData {
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
  videoViews?: number;
  channelName?: string;
}
export type CountByDayRes = {
  day: number;
  uniqueVideoCount: number;
};
export interface IGetVideoChannelHistoryRes extends DateData {
  videoId: string;
  videoViews: number;
  channelId: string;
  channelAverageViews: number;
}
export interface GetVideoAndChannelViewsByDateAndKeywordsRes
  extends Pick<
    IGetVideoChannelHistoryRes,
    'channelAverageViews' | 'videoViews' | 'videoId' | 'channelId'
  > {}
export interface GetVideoViewsMatchingSearchOnSpecificDateRes
  extends Pick<
    IGetVideoChannelHistoryRes,
    'videoViews' | 'videoId' | 'channelId'
  > {}
export interface GetVideoViewsPerformanceMatchingSearchOnSpecificDate
  extends Pick<IGetVideoChannelHistoryRes, 'videoViews' | 'videoId'> {
  videoPerformance: number;
  videoDuration: number;
}
