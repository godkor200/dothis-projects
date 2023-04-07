import { z } from 'zod';

export const zRelWords = z.object({
  keyword: z.string(),

  relWords: z.string(),
});

export type RelWordsModel = z.TypeOf<typeof zRelWords>;
