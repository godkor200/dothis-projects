import { c } from '../contract';
import { zAccVideoModel, zVideoModel, zVideoResponse } from './video.model';
import { zErrResBase } from '../error.response.zod';
import {
  zClusterNumberMulti,
  zPaginatedIgniteQueryParams,
  zPaginatedIgniteQuerySort,
  zTotalData,
} from '../common.model';
import {
  findVideoBySearchKeyword,
  zFindAccumulateQuery,
  zFindIndividualVideoInfoParams,
  zFindVideoBySearchKeyword,
  zGetAdsRelatedTopHits,
  zGetAdsRelatedTopHitsRes,
  zGetVideoAdsInfoRes,
  zTodayIssueVideo,
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
    query: zPaginatedIgniteQuerySort,
    responses: {
      200: zVideoResponse,
      ...zErrResBase,
    },
    summary: '관련어와 탐색어를 기준으로 비디오를 가져옵니다. v2',
    description: '관련어와 탐색어를 기준으로 비디오를 가져옵니다.',
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
  getAdvertisingRelatedVideo: {
    method: 'GET',
    path: `${videoBaseApiUrl}/:clusterNumber/ads/top-hits`,
    pathParams: zClusterNumberMulti,
    query: zGetAdsRelatedTopHits,
    responses: {
      200: zGetAdsRelatedTopHitsRes,
      ...zErrResBase,
    },
    summary: '관련어와 탐색어를 기준으로 광고 조회수 큰것부터 불러옵니다.',
    description:
      '관련어와 탐색어를 기준으로 광고 조회수 큰것부터 불러옵니다. limit 쿼리로 불러오는 갯수를 지정할수 있습니다.',
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
  getPerformanceByVideoLength: {
    method: 'GET',
    path: `${videoBaseApiUrl}/:clusterNumber/performance/duration`,
    pathParams: zClusterNumberMulti,
    query: zFindAccumulateQuery,
    responses: {
      200: zAccVideoModel,
      ...zErrResBase,
    },
    summary:
      '관련어와 탐색어를 기준으로 영상 길이별 조회수/성과 분포를 가져옵니다.',
    description:
      '탐색어(keyword), 연관어(relationKeyword), 날짜(from,to)로 영상 길이별 조회수/성과 분포를 가져옵니다.',
  },
  getVideoCount: {
    method: 'GET',
    path: `${videoBaseApiUrl}/count`,
    query: findVideoBySearchKeyword,
    responses: {
      200: zTotalData,
      ...zErrResBase,
    },
    summary: '관련어와 탐색어를 기준으로 영상 갯수를 가져옵니다.',
    description:
      '탐색어(keyword), 연관어(relationKeyword), 날짜(from, to)로 영상 발행일(publish) 기준으로 영상 갯수를 가져옵니다.',
  },
  getIssueToday: {
    method: 'GET',
    path: `${videoBaseApiUrl}/issue/today`,
    responses: {
      200: zTodayIssueVideo,
      ...zErrResBase,
    },
    summary: '오늘의 이슈 영상을 가져옵니다.',
    description:
      '오늘의 이슈 영상을 가져옵니다.' +
      '\n' +
      '- 영상 검색\n' +
      '\n' +
      '    - 추천 키워드 1 + 1등 연관어가 포함된 영상\n' +
      '        - 조회수 1등 영상 반환(조회수 내림차순 정렬, limit 1)\n' +
      '    - 추천 키워드 2 + 1등 연관어가 포함된 영상\n' +
      '        - 조회수 1등 영상 반환(조회수 내림차순 정렬, limit 1)\n' +
      '    - 추천 키워드 3 + 1등 연관어가 포함된 영상\n' +
      '        - 조회수 1등 영상 반환(조회수 내림차순 정렬, limit 1)\n' +
      '    - 총 3개 영상 반환\n' +
      '    - 미니는 일단 영상은 3개 반환 받은 후 콘텐츠 블럭에 영상 or뉴스 중 뭐를 출력할지는 각각 랜덤\n' +
      '        - ex)\n' +
      '            - 영상/뉴스/뉴스 or 뉴스/영상/뉴스 or 영상/영상/영상 등',
  },
});
