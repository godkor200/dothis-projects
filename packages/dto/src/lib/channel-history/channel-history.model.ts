import { z } from 'zod';

export const zChannelHistoryModel = z.object({
  channel_id: z.string(),

  channel_subscribers: z.number(),

  channel_total_views: z.number(),

  channel_total_videos: z.number(),

  channel_average_views: z.number(),

  crawled_date: z.string(),
});

export type ChannelHistoryModel = z.TypeOf<typeof zChannelHistoryModel>;

export const zExpectedViews = z.object({
  data: z.array(
    z.object({
      date: z.string(),
      expected_views: z.number(),
    }),
  ),
});
