import { initContract } from '@ts-rest/core';
import { z } from 'zod';

export const zUser = z.object({
  userId: z.number().nullable().describe('The id of user'),
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

const c = initContract();

export const apiUser = c.router({
  verifyAccessTokenPost: {
    method: 'POST',
    path: '/verify-access',
    responses: { 200: z.string() },
    body: z.object({ message: z.string() }),
  },
  verifyRefreshTokenPost: {
    method: 'POST',
    path: '/verify-refresh',
    responses: { 200: z.string() },
    body: z.object({ message: z.string(), accessToken: z.string() }),
  },
});
