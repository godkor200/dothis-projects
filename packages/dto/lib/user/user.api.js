"use strict";
exports.__esModule = true;
exports.userApi = exports.userBaseApiUrl = void 0;
var zod_1 = require("zod");
var contract_1 = require("../contract");
var user_model_1 = require("./user.model");
exports.userBaseApiUrl = '/user';
exports.userApi = contract_1.c.router({
    getUser: {
        method: 'GET',
        path: "".concat(exports.userBaseApiUrl, "/:id"),
        pathParams: exports.userBaseApiUrl,
        query: { id: zod_1.z.string() },
        responses: {
            200: user_model_1.userModel,
            401: 'Not Found',
            500: '서버에 문제가 있으면 리턴한다.'
        },
        summary: '유저를 가져옵니다.',
        description: '쿼리 id로 유저를 찾아 옵니다.'
    },
    getUserChannelData: {
        method: 'POST',
        path: "".concat(exports.userBaseApiUrl, "/get-channel-data"),
        pathParams: exports.userBaseApiUrl,
        body: {},
        responses: {
            200: '성공적으로 채널데이터를 저장한다면 성공 여부를 리턴한다.',
            401: '채널에 이미 저장된 데이터가 있다면 오류를 리턴한다.',
            404: 'Not Found',
            500: '구글 서버에 문제가 있거나 구글 auth 내용이 비정상적이라면 리턴한다.'
        },
        summary: '유저 채널 데이터 저장하기',
        description: '유저가 채널 데이터를 가져오기 하면 크롤링된 channel 테이블에서 userChannelData 테이블로 이동, 추후 로직이 변경 될수 있음(2023.02.06일 기준)'
    }
});
