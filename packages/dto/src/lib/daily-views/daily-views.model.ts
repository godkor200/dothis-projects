import { z } from 'zod';

export const zDailyViews = z.object({
  id: z.number(),

  channelIndex: z.number(),

  videoId: z.number(),

  date: z.date(),

  views: z.number(),
});

export type DailyViewModel = z.TypeOf<typeof zDailyViews>;
