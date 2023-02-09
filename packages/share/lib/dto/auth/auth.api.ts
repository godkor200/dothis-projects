import { c } from '../contract';

export const baseApiUrl = '/auth';

export const authApi = c.router({
  getGoogleLogin: {
    method: 'GET',
    path: `${baseApiUrl}/google-login`,
    pathParams: baseApiUrl,
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
    path: `${baseApiUrl}/google-redirect`,
    pathParams: baseApiUrl,
    responses: { 200: 'Dothis Authentication' },
    summary: '유저 로그인 후 토큰 리턴',
    description:
      '유저 관련 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.',
  },
  getVerifyToken: {
    method: 'GET',
    path: `${baseApiUrl}/verify-token`,
    pathParams: baseApiUrl,
    responses: {
      //TODO: 모듈화 필요
      200: 'authorized',
      401: 'Invalid Credential',
      500: 'Internal Server Error',
    },
    summary: '토큰 확인(accessToken,refreshToken) 후 갱신된 토큰 리턴',
    description:
      '갱신된 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.',
  },
});
