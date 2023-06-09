import { z } from 'zod';

export const LOGIN_KEYWORD_SCHEMA = z.object({
  keyword: z.string().array().max(5),
});

export type KeywordSchema = z.infer<typeof LOGIN_KEYWORD_SCHEMA>;
