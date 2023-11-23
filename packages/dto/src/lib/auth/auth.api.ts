import { c, USER_AUTH } from '../contract';
import { z } from 'zod';
import { userBaseApiUrl, zUserModel } from '../user';
import { zTokenExpired } from './auth.constant';

export const authBaseApiUrl = '/auth';

export const authApi = c.router({
  getGoogleLogin: {
    method: 'GET',
    path: `${authBaseApiUrl}/google-login`,
    responses: {
      //TODO: 모듈화 필요
      200: 'Google Authentication',
      401: 'Invalid Credential',
      500: 'Internal Server Error',
    },
    summary: '구글 로그인',
    description: '구글 로그인 후 /google-redirect로 리다이렉트한다.',
  },
  getGoogleRedirect: {
    method: 'GET',
    path: `${authBaseApiUrl}/google-redirect`,
    responses: { 200: 'Dothis Authentication' },
    summary: '유저 로그인 후 토큰 리턴',
    description:
      '유저 관련 토큰 accessToken, refreshToken, isNewUser은 쿼리로 보내어진다.',
  },
  getVerifyToken: {
    method: 'GET',
    path: `${authBaseApiUrl}/verify-token`,
    responses: {
      //TODO: 모듈화 필요
      200: z.object({ success: z.boolean(), data: z.any() }),
      400: z.object({
        statusCode: z.number(),
        message: z.string().default(USER_AUTH.NoTokenProvided),
      }),
      401: zTokenExpired,
      500: 'Internal Server Error',
    },
    summary: '토큰 확인(accessToken, refreshToken) 후 갱신된 토큰 리턴',
    description:
      '유저 관련 토큰 accessToken, refreshToken은 쿠키, 바디로 보내어진다.',
  },
  getOwnInfo: {
    method: 'GET',
    path: `${authBaseApiUrl}/own-info`,
    responses: {
      200: zUserModel,
      401: zTokenExpired,
      404: 'Not Found',
      500: 'Internal Server Error',
    },
    summary: '토큰 확인후 유저 정보 리턴',
    description: '유저 관련 토큰 accessToken으로 사용자의 정보를 불러온다.',
  },
  logout: {
    method: 'DELETE',
    path: `${authBaseApiUrl}/logout`,
    responses: {
      200: '성공적으로 로그아웃되면 성공 여부를 리턴한다.',
      404: 'Not Found',
      500: 'server error',
    },
    body: {},
    summary: '유저 로그아웃',
    description: '유저 로그아웃(쿠키와 회원 정보 관련 destroy)',
  },
});
