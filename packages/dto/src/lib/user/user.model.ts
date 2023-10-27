import { z } from 'zod';

export const zUserModel = z.object({
  data: z.object({
    id: z.number().nullable().describe('The id of user'),
    userEmail: z.string().email().max(30).nullable().describe('user email'),
    channelId: z.number().nullable().describe('User Channel-id'),
    tokenRefresh: z.string().max(110).nullable().describe('refresh token'),
    plan: z.string().max(10).describe('price plan'),
    isAdmin: z
      .boolean()
      .default(false)
      .nullable()
      .describe('Whether or not you are an administrator'),
    status: z.string().nullable().describe('membership status'),
    dateSignIn: z
      .date()
      .nullable()
      .describe('The date which the user was created'),
    agreePromotion: z
      .boolean()
      .default(false)
      .nullable()
      .describe('user agreePromotion'),
    personalizationTag: z
      .string()
      .nullable()
      .describe('user personalizationTag'),
  }),
});

export type TUserModel = z.TypeOf<typeof zUserModel>;

export const zKeywordModel = z.object({
  data: z.object({
    channel_keywords: z.array(z.string()).nullable(),
    channel_tags: z.array(z.string()).nullable(),
  }),
});
