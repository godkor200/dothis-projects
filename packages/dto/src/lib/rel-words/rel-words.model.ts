import { z } from 'zod';

export const zRelWords = z.object({
  data: z.object({
    id: z.number(),
    cluster: z.string(),
    keyword: z.string(),
    relWords: z.string(),
  }),
});

export const zRelWordsArray = z.array(z.string());

export type RelWordsModel = z.TypeOf<typeof zRelWords>;
