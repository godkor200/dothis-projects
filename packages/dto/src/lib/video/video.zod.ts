import { z } from 'zod';
import {
  zClusterNumberMulti,
  zDateQuery,
  zPaginatedQuery,
  zSearchKeyword,
} from '../common.model';
import { zVideoModel } from './video.model';

export const zClusterQueryParams = z.object({
  cluster: z.string(),
});
export const zClusterPathParams = z.object({
  clusterNumber: z
    .string()
    .describe('찾을 비디오의 클러스터 번호 값을 입력받습니다.')
    .default('0'),
});

export const findVideoBySearchKeyword = zSearchKeyword.merge(zDateQuery);

export const zFindVideoBySearchKeyword = findVideoBySearchKeyword;

export const findVideoBySearchKeywordClusterNumber = zSearchKeyword
  .merge(zDateQuery)
  .merge(zClusterPathParams);

export const findVideoPageQuery = zSearchKeyword.merge(zPaginatedQuery);
export const zFindVideoPageWithClusterQuery = zSearchKeyword
  .merge(zPaginatedQuery)
  .merge(zClusterQueryParams);

export type IKeyword = z.TypeOf<typeof zSearchKeyword>;
export type IPageQuery = z.TypeOf<typeof zPaginatedQuery>;
export type TPageWithClusterQueryQuery = z.TypeOf<
  typeof zFindVideoPageWithClusterQuery
>;

export type VideoModel = z.TypeOf<typeof zVideoModel>;

/**
 * 개별 비디오
 * */

export const zPredictionStatus = z.enum(['INSUFFICIENT_DATA', 'PREDICTING']);

export const VideoPerformance = z.object({
  expectedViews: z.number(),
  participationRate: z.number(),
});

export const zPredictedViews = z.object({
  date: z.string(),
  predictedViews: z.number(),
});

export const zVideoPrediction = z.object({
  status: zPredictionStatus,
  dailyViews: z.array(zPredictedViews).nullable(),
});

export const ChannelPerformance = z.object({
  subscribers: z.number(),
  averageViews: z.number(),
});

export const zVideoDetails = z.object({
  data: z.object({
    videoTags: z.string(),
    videoPerformance: VideoPerformance,
    videoPrediction: zVideoPrediction,
    channelPerformance: ChannelPerformance,
  }),
});
/*
 * 연간 비디오수 v2
 */
export const zFindAccumulateQuery = findVideoBySearchKeyword;
export const zFindIndividualVideoInfoParams = zClusterPathParams.merge(
  z.object({
    videoId: z
      .string()
      .default('Mm-8O8iFmao')
      .describe('찾을 비디오의 id 값을 입력받습니다.'),
  }),
);
