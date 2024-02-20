import { z } from 'zod';
import {
  dataObject,
  zDateQuery,
  zPaginatedQuery,
  zSearchKeyword,
} from '../common.model';

export const zVideoSection = z.enum([
  '0~100',
  '100~1000',
  '1000~10000',
  '10000~50000',
  '50000~100000',
  '100000~500000',
  '500000이상',
]);

export const zAccVideoModel = dataObject(
  z.object({
    section: z.array(
      z.object({
        gte: z.number(),
        lte: z.number(),
        max: z.number().nullable(),
        section: zVideoSection,
        number: z.number(),
      }),
    ),
    userSection: z.string(),
    videoTotal: z.number(),
  }),
);

export const zVideoModel = z.object({
  id: z.number().nullable().describe('The id of video'),
  channelIndex: z.string().describe('The index of channel'),
  videoTitle: z.string().describe('The title of video'),
  videoUrl: z.string().describe('The url of video'),
  videoDescription: z.string().describe('The Description of video'),
  videoDuration: z.string().describe('The Duration of video'),

  videoPublished: z.string().describe('The Published of video'),

  videoViews: z.string().describe('Daily view count').default('0'),

  videoLikes: z.number().describe('like count').default(0),

  videoTags: z.string().describe('video tag').default('[]'),

  videoCategory: z.string().describe('video category').default('[]'),

  videoInfoCard: z.string().describe('video info card').default('0'),

  videoWithAds: z
    .string()
    .describe(
      'whether or not there is an advertisement and the number of advertisements',
    ),

  videoEndScreen: z
    .string()
    .describe(
      `I think it's the next video recommendation on YouTube, but I'm not sure what it is`,
    ),

  //   videoCoreKeyword: z.string(),

  videoAverageViews: z.number().describe('Average number of hits'),

  crawlUpdateAt: z.date().describe('Crawled time'),
});

export const zVideoResponse = z.object({
  data: z.object({
    data: z.array(
      z.object({
        sort: z.object({ 0: z.string() }),
        _id: z.string(),
        _index: z.string(),
        _score: z.null(),
        _source: z.object({
          channel_id: z.string(),
          channel_name: z.string(),
          video_id: z.string(),
          crawled_date: z.string(),
          video_category: z.string().describe('video category').default('[]'),
          video_cluster: z.number(),
          video_description: z.string().describe('The Description of video'),
          video_duration: z.number().describe('The Duration of video'),
          video_published: z.string().describe('The Published of video'),
          video_tag: z.string().describe('video tag').default('[]'),
          video_title: z.string().describe('The title of video'),
          video_url: z.string().describe('The url of video'),
          video_info_card: z.string().describe('video info card').default('0'),
          video_end_screen: z
            .number()
            .describe(
              `I think it's the next video recommendation on YouTube, but I'm not sure what it is`,
            ),
          video_with_ads: z
            .number()
            .describe(
              'whether or not there is an advertisement and the number of advertisements',
            ),

          video_history: z.array(
            z.object({
              channel_id: z.string(),
              crawled_date: z.string(),
              video_comments: z.number(),
              video_id: z.string(),
              video_likes: z.number(),
              video_views: z.number(),
            }),
          ),
        }),
      }),
    ),
    total: z.object({ value: z.number(), relation: z.string() }),
  }),
});

export const zClusterQueryParams = z.object({
  cluster: z.string(),
});
export const zClusterPathParams = z.object({
  clusterNumber: z.string().describe('6'),
});

export const findVideoBySearchKeyword = zSearchKeyword.merge(zDateQuery);
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

export type VideoDetailsModel = z.TypeOf<typeof zVideoDetails.shape.data>;
export type VideoPrediction = z.TypeOf<typeof zVideoPrediction>;
export type PredictedViews = z.TypeOf<typeof zPredictedViews>;
