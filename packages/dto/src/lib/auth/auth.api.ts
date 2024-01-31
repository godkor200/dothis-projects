import { c } from '../contract';
import { z } from 'zod';
import { zUserModel } from '../user';
import { zErrResBase } from '../error.response.zod';

export const authBaseApiUrl = '/auth';

export const authApi = c.router({
  getGoogleLogin: {
    method: 'GET',
    path: `${authBaseApiUrl}/google-login`,
    responses: {
      200: c.type<any>(),
      ...zErrResBase,
    },
    summary: '구글 로그인',
    description: '구글 로그인 후 /google-redirect로 리다이렉트한다.',
  },
  getGoogleRedirect: {
    method: 'GET',
    path: `${authBaseApiUrl}/google-redirect`,
    responses: { 200: c.type<{ message: string }>(), ...zErrResBase },
    summary: '유저 로그인 후 토큰 리턴',
    description:
      '유저 관련 토큰 accessToken, refreshToken, isNewUser은 쿼리로 보내어진다.',
  },
  getVerifyToken: {
    method: 'GET',
    path: `${authBaseApiUrl}/verify-token`,
    responses: {
      200: z.object({ success: z.boolean(), data: z.any() }),
      ...zErrResBase,
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
      ...zErrResBase,
    },
    summary: '토큰 확인후 유저 정보 리턴',
    description: '유저 관련 토큰 accessToken으로 사용자의 정보를 불러온다.',
  },
  logout: {
    method: 'DELETE',
    path: `${authBaseApiUrl}/logout`,
    responses: {
      200: c.type<{ message: string }>(),
      ...zErrResBase,
    },
    body: z.object({}),
    summary: '유저 로그아웃',
    description: '유저 로그아웃(쿠키와 회원 정보 관련 destroy)',
  },
});
