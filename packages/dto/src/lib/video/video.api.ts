import { c } from '../contract';

import {
  isVideoModel,
  zAccVideoModel,
  zVideoModel,
  zVideoResponse,
} from './video.model';
import { zErrResBase } from '../error.response.zod';
import {
  zClusterNumberMulti,
  zPaginatedIgniteQueryParams,
} from '../common.model';
import {
  findVideoBySearchKeyword,
  zFindAccumulateQuery,
  zFindIndividualVideoInfoParams,
  zFindVideoBySearchKeyword,
  zFindVideoPageWithClusterQuery,
  zGetVideoAdsInfoRes,
  zVideoDetails,
} from './video.zod';

export const videoBaseApiUrl = '/video';

export const videoApi = c.router({
  getVideoTest: {
    method: 'GET',
    path: `${videoBaseApiUrl}/test`,
    query: findVideoBySearchKeyword,
    responses: {
      200: zVideoResponse,
      ...zErrResBase,
    },
    summary: '이그 나이트 태스트용',
    description: '이그 나이트 태스트용',
  },
  getVideoPageV1: {
    method: 'GET',
    path: `${videoBaseApiUrl}/:clusterNumber`,
    pathParams: zClusterNumberMulti,
    query: zPaginatedIgniteQueryParams,
    responses: {
      200: zVideoModel,
      ...zErrResBase,
    },
    summary: '관련어와 탐색어를 기준으로 비디오를 가져옵니다.',
    description: '관련어와 탐색어를 기준으로 비디오를 가져옵니다.',
  },
  getVideoPageV2: {
    method: 'GET',
    path: `${videoBaseApiUrl}`,
    query: zFindVideoPageWithClusterQuery,
    responses: {
      200: zVideoResponse,
      ...zErrResBase,
    },
    summary: '관련어와 탐색어를 기준으로 비디오를 가져옵니다. v2',
    description:
      '관련어와 탐색어를 기준으로 비디오를 가져옵니다. 마지막 _id를 last에 넣고 다시 요청하면 다음 페이지의 비디오 리스트를 받을수 있습니다. 쿼리로 cluster를 배열로 넣고 한번 호출하고 페이지네이션 기능구현하시면 됩니다',
  },
  getVideoAdsInfo: {
    method: 'GET',
    path: `${videoBaseApiUrl}/:clusterNumber/ads`,
    pathParams: zClusterNumberMulti,
    query: zFindVideoBySearchKeyword,
    responses: {
      200: zGetVideoAdsInfoRes,
      ...zErrResBase,
    },
    summary: '관련어와 탐색어를 기준으로 광고 정보를 가져옵니다',
    description: '관련어와 탐색어를 기준으로 광고 정보를 가져옵니다.',
  },
  getIndividualVideo: {
    method: 'GET',
    path: `${videoBaseApiUrl}/:videoId/info/:clusterNumber`,
    pathParams: zFindIndividualVideoInfoParams, // 비디오 카테고리(cluster) 넘버, 비디오 아이디
    responses: {
      200: zVideoDetails,
      ...zErrResBase,
    },
    summary: '비디오 id를 기준으로 비디오 정보를 가져 옵니다',
    description: '비디오 id를 기준으로 비디오 정보를 가져 옵니다 ',
  },
  getAccumulateVideo: {
    method: 'GET',
    path: `${videoBaseApiUrl}/:clusterNumber/accumulate`,
    pathParams: zClusterNumberMulti,
    query: zFindAccumulateQuery,
    responses: {
      200: zAccVideoModel,
      ...zErrResBase,
    },
    summary: '관련어와 탐색어를 기준으로 누적 영상수를 가져옵니다.',
    description:
      '탐색어(keyword), 연관어(relationKeyword), 날짜(from,to)로 누적 영상수를 가져옵니다 .기존에꺼 대비해서 한번만 호출하면 됩니다.',
  },
});
