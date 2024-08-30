interface IIncreaseData {
  date: string;
  increaseViews: number;
  increaseLikes: number;
  increaseComments: number;
}

interface IIncreaseHitsData extends IIncreaseData {
  uniqueVideoCount: number;
}

interface IVideoHistory {
  inner_hits: {
    video_history: {
      hits: {
        hits: {
          _source: IFindVideoHistoryResponse;
        }[];
      };
    };
  };
}

interface IFindVideoHistoryResponse {
  crawled_date: string;
  video_views: number;
  video_likes: number;
  video_comments: number;
}

interface GetRelatedVideoHistory {
  videoId: string;
  year: number;
  month: number;
  day: number;
  videoViews: number;
  videoLikes: number;
  videoComments: number;
}

interface PredictedViews {
  date: string;
  predictedViews: number;
}

enum PredictionStatus {
  PREDICTING,
  INSUFFICIENT_DATA,
}

interface VideoPrediction {
  status: PredictionStatus;
  dailyViews: PredictedViews[] | null;
}

interface IIncreaseHits
  extends Omit<IIncreaseHitsData, 'increaseLikes' | 'increaseComments'> {
  expectedHits: number;
  maxPerformance: number;
  minPerformance: number;
}

interface IIncreaseHitsPickViews
  extends Pick<IIncreaseHitsData, 'increaseViews' | 'date'> {}
export interface IIncreaseDailyViews {
  representativeCategory: number;
  data: IIncreaseHitsPickViews[];
}
interface IIncreaseSetVideoIds extends IIncreaseHits {
  videoIds: Set<string>;
}
export {
  IIncreaseData,
  IIncreaseHits,
  VideoPrediction,
  GetRelatedVideoHistory,
  IVideoHistory,
  IIncreaseHitsData,
  IIncreaseSetVideoIds,
};
