import { z } from 'zod';
export const userModel = z.object({
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
});

export type UserModel = z.TypeOf<typeof userModel>;
