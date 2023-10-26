import { z } from 'zod';

export const zDailyViews = z.object({
  data: z.object({
    date: z.date(),
    increase_comments: z.number(),
    increase_likes: z.number(),
    increase_views: z.number(),
  }),
});

export const zVideoHistory = z.object({
  _index: z.string(),
  _id: z.string(),
  _score: z.number(),
  _source: z.object({
    video_id: z.string(),
    video_views: z.number(),
    video_likes: z.number(),
    video_comments: z.number(),
    crawled_date: z.string(),
    performance: z.number(),
  }),
});

export type DailyViewModel = z.TypeOf<typeof zDailyViews>;
