import { z } from 'zod';

import { c } from '../contract';

export const baseApiUrl = '/v1/auth';

export const authApi = c.router({
  getGoogleLogin: {
    method: 'GET',
    path: `${baseApiUrl}/google-login`,
    responses: { 200: z.string() },
    summary: '구글 로그인',
    description: '구글 로그인 후 /google-redirect로 리다이렉트한다.',
  },
  getGoogleRedirect: {
    method: 'GET',
    path: `${baseApiUrl}/google-login`,
    responses: { 200: z.string() },
    summary: '유저 로그인 후 토큰 리턴',
    description:
      '유저 관련 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.',
  },
  postVerifyAccessToken: {
    method: 'POST',
    path: `${baseApiUrl}/verify-access`,
    responses: { 200: z.string() },
    body: z.object({
      message: z.string(),
    }),
    summary: '',
  },
  postVerifyRefreshToken: {
    method: 'POST',
    path: `${baseApiUrl}/verify-refresh`,
    responses: { 200: z.string() },
    body: z.object({
      message: z.string(),
      accessToken: z.string(),
    }),
    summary: '',
  },
  getVerifyToken: {
    method: 'GET',
    path: `${baseApiUrl}/verify-token`,
    responses: { 200: z.string() },
    summary: '토큰 확인(accessToken,refreshToken) 후 갱신된 토큰 리턴',
    description:
      '갱신된 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.',
  },
});
