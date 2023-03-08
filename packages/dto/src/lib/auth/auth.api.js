"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authApi = exports.authBaseApiUrl = void 0;
const contract_1 = require("../contract");
exports.authBaseApiUrl = '/auth';
exports.authApi = contract_1.c.router({
    getGoogleLogin: {
        method: 'GET',
        path: `${exports.authBaseApiUrl}/google-login`,
        pathParams: exports.authBaseApiUrl,
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
        path: `${exports.authBaseApiUrl}/google-redirect`,
        pathParams: exports.authBaseApiUrl,
        responses: { 200: 'Dothis Authentication' },
        summary: '유저 로그인 후 토큰 리턴',
        description: '유저 관련 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.',
    },
    getVerifyToken: {
        method: 'GET',
        path: `${exports.authBaseApiUrl}/verify-token`,
        pathParams: exports.authBaseApiUrl,
        responses: {
            //TODO: 모듈화 필요
            200: 'authorized',
            401: 'Invalid Credential',
            500: 'Internal Server Error',
        },
        summary: '토큰 확인(accessToken,refreshToken) 후 갱신된 토큰 리턴',
        description: '갱신된 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.',
    },
});
//# sourceMappingURL=auth.api.js.map