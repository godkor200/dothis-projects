import { z } from 'zod';

export const zChannelHistoryModel = z.object({
  id: z.string().nullable(),

  channelId: z.string(),

  totalView: z.number(),

  totalVideos: z.number(),

  averageViews: z.number(),
});

export type ChannelHistoryModel = z.TypeOf<typeof zChannelHistoryModel>;
