import { number, z } from 'zod';
import { dataObject } from '../common.model';
import { zPredictedViews, zVideoDetails, zVideoPrediction } from './video.zod';

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

export const zVideo = z.object({
  channelId: z.string(),
  videoId: z.string(),
  videoTitle: z.string(),
  videoDescription: z.string(),
  videoTags: z.string(),
  videoDuration: z.number(),
  videoPublished: z.string(),
  videoCategory: z.string(),
  videoInfoCard: z.boolean(),
  videoWithAds: z.boolean(),
  videoEndScreen: z.boolean(),
  videoCluster: z.number(),
  channelName: z.string(),
  videoViews: z.number(),
  crawledDate: z.string(),
  year: z.number(),
  month: z.number(),
  day: z.number(),
});
export const zVideoRes = z.object({
  total: z.number(),
  data: z.array(zVideo),
});
export const zVideoPublishCountData = z.array(
  z.object({
    date: z
      .string()
      .refine(
        (dateString) => {
          // 날짜 형식 검증 (YYYYMMDD)
          return /^\d{4}\d{2}\d{2}$/.test(dateString);
        },
        {
          message: '날짜는 YYYYMMDD 형식이어야 합니다.',
        },
      )
      .describe('영상 발행 날짜'),
    number: z.number().describe('해당 날짜의 영상수').default(0),
  }),
);

export const zVideoModel = dataObject(zVideoRes);
export const zVideoCountRes = zVideoPublishCountData;

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

export type VideoDetailsModel = z.TypeOf<typeof zVideoDetails.shape.data>;
export type VideoPrediction = z.TypeOf<typeof zVideoPrediction>;
export type PredictedViews = z.TypeOf<typeof zPredictedViews>;

/**
 * 해당 dto는 존재해서 밑으로 옮겨두었습니다.
 */
export const isVideoModel = z.object({
  id: z.number().nullable().describe('The id of video'),
  channelIndex: z.string().describe('The index of channel'),
  videoId: z.string(),
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
