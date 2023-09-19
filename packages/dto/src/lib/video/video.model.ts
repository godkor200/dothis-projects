import { z } from 'zod';

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

  videoAverageViews: z.number().describe('Average number of views'),

  crawlUpdateAt: z.date().describe('Crawled time'),
});

export const zPaginatedQuery = z.object({
  limit: z.number().describe('Specifies a limit of returned records'),
  last: z.string().describe('Last index returned').optional(),
});

export const zKeyword = z.object({
  search: z.string().describe('탐색어'),
  related: z.string().describe('연관어').optional(),
});
export const findVideoPageQuery = zKeyword.merge(zPaginatedQuery);
export interface IKeyword extends z.TypeOf<typeof zKeyword> {}
export interface IPageQuery extends z.TypeOf<typeof zPaginatedQuery> {}

export type VideoModel = z.TypeOf<typeof zVideoModel>;
