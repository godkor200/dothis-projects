import { z } from 'zod';

export const zExpectedData = z.object({
  date: z.string(),
  expected_views: z.number(),
});

export const zIncreaseData = z.object({
  date: z.string(),
  increase_views: z.number(),
  increase_likes: z.number(),
  increase_comments: z.number(),
});
