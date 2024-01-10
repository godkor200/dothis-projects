import { z } from 'zod';

export const zDailyViewData = z.object({
  date: z.string(),
  increase_comments: z.number(),
  increase_likes: z.number(),
  increase_views: z.number(),
});

export const zDailyViews = z.object({
  data: z.array(zDailyViewData),
});

const OsCommonSchema = z.object({
  _index: z.string(),
  _id: z.string(),
  _score: z.number(),
});

export const WeeklyKeywordsListSourceSchema = z.object({
  keyword: z.string(),
  category: z.string(),
  weekly_views: z.number(),
  video_count: z.number(),
  competitive: z.number(),
  mega_channel: z.number(),
});

export const zWeeklyKeywordsLisSchema = OsCommonSchema.extend({
  _source: WeeklyKeywordsListSourceSchema,
});

const VideoHistorySourceSchema = OsCommonSchema.extend({
  video_id: z.string(),
  video_views: z.number(),
  video_likes: z.number(),
  video_comments: z.number(),
  crawled_date: z.string(),
  performance: z.number(),
});

export const zVideoHistory = OsCommonSchema.extend({
  _source: VideoHistorySourceSchema,
});

export type DailyViewModel = z.TypeOf<typeof zDailyViews>;

export type TWeeklyKeywordsListSource = z.infer<
  typeof WeeklyKeywordsListSourceSchema
>;
