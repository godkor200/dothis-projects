import { z } from 'zod';

export const zChannelHistoryModel = z.object({
  channel_id: z.string(),

  channel_subscribers: z.number(),

  channel_total_views: z.number(),

  channel_total_videos: z.number(),

  channel_average_views: z.number(),

  crawled_date: z.string(),
});
export const zExpectedViewsData = z.object({
  date: z.string(),
  expected_views: z.number(),
});

export const zExpectedViewsArr = z.array(zExpectedViewsData);

export const zExpectedViews = z.object({
  data: zExpectedViewsArr,
});

export type ChannelHistoryModel = z.TypeOf<typeof zChannelHistoryModel>;

export type TExpectedViewsRes = z.TypeOf<typeof zExpectedViews>;

export type TExpectedViewsArr = z.TypeOf<typeof zExpectedViewsArr>;
