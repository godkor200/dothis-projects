import { z } from 'zod';

export const zDailyViews = z.object({
  id: z.number(),

  channelIndex: z.number(),

  videoId: z.number(),

  date: z.date(),

  views: z.number(),
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

export type TVideoHistoryModel = z.TypeOf<typeof zVideoHistory>;

export interface IVideoHistory extends TVideoHistoryModel {}
export class VideoHistoryModel implements IVideoHistory {}
