import { z } from 'zod';

import { c } from '../contract';

export const zUser = z.object({
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

export type UserModel = z.TypeOf<typeof zUser>;

export const apiUser = c.router({
  verifyAccessTokenPost: {
    method: 'POST',
    path: '/verify-access',
    responses: { 200: z.string() },
    body: z.object({
      message: z.string(),
    }),
    summary: '',
  },
  verifyRefreshTokenPost: {
    method: 'POST',
    path: '/verify-refresh',
    responses: { 200: z.string() },
    body: z.object({
      message: z.string(),
      accessToken: z.string(),
    }),
    summary: '',
  },
  verifyTokenGet: {
    method: 'GET',
    path: '/verify-token',
    responses: { 200: z.string() },
  },
});
