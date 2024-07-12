import { c } from '../contract';
import {
  zClusterSpecificCombinedData,
  zCombinedViewsData,
  zDailyViewsData,
  zExpectedViews,
  zKeywordThisWeeklyRes,
  zWeeklyKeywordsList,
  zSuccessRate,
  zCombinedViewsDataResponse,
} from './hits.model';
import { findVideoBySearchKeyword, zFindVideoBySearchKeyword } from '../video';
import { zErrResBase } from '../error.response.zod';
import { zSuccessBase } from '../success.response.zod';
import {
  dataObject,
  zClusterNumber,
  zClusterNumberMulti,
  zOnlyLimit,
} from '../common.model';
import { zGetWeeklyViewsBySomeQuery, zGetWeeklyViewsQuery } from './hits.zod';
import { z } from 'zod';
export const expectedHitsApiUrl = '/expectation';
export const viewApiUrl = '/hits';
const dailyApiUrl = '/daily';
const weeklyApiUrl = '/weekly';
export const hitsApi = c.router({
  getDailyViewsV1: {
    method: 'GET',
    path: `${viewApiUrl}${dailyApiUrl}/:clusterNumber`,
    pathParams: zClusterNumber,
    query: findVideoBySearchKeyword,
    responses: {
      200: zSuccessBase.merge(zDailyViewsData),
      ...zErrResBase,
    },
    summary: '일일 조회수를 가져옵니다',
    description:
      '탐색어(search), 연관어(related), 날짜(from, to)로 일일 조회수 를 출력합니다.',
  },
  getDailyViewsV2: {
    method: 'GET',
    path: `${viewApiUrl}${dailyApiUrl}`,
    query: findVideoBySearchKeyword,
    responses: {
      200: zSuccessBase.merge(zDailyViewsData),
      ...zErrResBase,
    },
    summary: '일일 조회수를 가져옵니다',
    description:
      '탐색어(search), 연관어(related), 날짜(from, to)로 일일 조회수 를 출력합니다.',
  },

  getDailyViews: {
    method: 'GET',
    path: `${viewApiUrl}${dailyApiUrl}/:clusterNumber`,
    pathParams: zClusterNumber,
    query: findVideoBySearchKeyword,
    responses: {
      200: zDailyViewsData,
      ...zErrResBase,
    },
    summary: '일일 조회수를 가져옵니다',
    description:
      '클러스터 번호(clusterNumber), 탐색어(search), 연관어(related), 날짜(from, to)로 일일 조회수 를 출력합니다.',
  },
  getWeeklyKeywordListWithPaging: {
    method: 'GET',
    path: `${viewApiUrl}${weeklyApiUrl}-list`,
    query: zGetWeeklyViewsQuery,
    responses: {
      200: zWeeklyKeywordsList,
      ...zErrResBase,
    },
    summary: '주간 키워드 리스트를 가져옵니다',
    description: '날짜(from)로 주간 키워드 리스트를 출력합니다.',
  },
  getWeeklyKeywordListWithPagingV2: {
    method: 'GET',
    path: `${viewApiUrl}${weeklyApiUrl}-list`,
    query: zGetWeeklyViewsQuery,
    responses: {
      200: zWeeklyKeywordsList,
      ...zErrResBase,
    },
    summary:
      '주간 키워드 리스트를 가져옵니다. 파티셔닝 된 테이블에서 가져옵니다.',
    description: '날짜(from)로 주간 키워드 리스트를 출력합니다.',
  },
  getExpectedViews: {
    method: 'GET',
    path: `${viewApiUrl}${expectedHitsApiUrl}/:clusterNumber`,
    query: zFindVideoBySearchKeyword,
    pathParams: zClusterNumberMulti,
    responses: {
      200: zExpectedViews,
      ...zErrResBase,
    },
    summary: '기대 조회수를 가져옵니다',
    description:
      '탐색어(keyword), 연관어(relationKeyword), 날짜(from,to)로 기대 조회수를 출력합니다.',
  },
  getProbabilitySuccess: {
    method: 'GET',
    path: `${viewApiUrl}/:clusterNumber/success-rate`,
    query: zFindVideoBySearchKeyword,
    pathParams: zClusterNumberMulti,
    responses: {
      200: zSuccessRate,
      ...zErrResBase,
    },
    summary: '관련어, 연관어 영상들의 성공확률을 가져옵니다',
    description:
      '탐색어(keyword),연관어(relationKeyword), 날짜(from,to)로 성공 확률을 가져옵니다.',
  },
  getWeeklyKeywordSome: {
    method: 'GET',
    path: `${viewApiUrl}${weeklyApiUrl}-list/search`,
    query: zGetWeeklyViewsBySomeQuery,
    responses: {
      200: zWeeklyKeywordsList,
      ...zErrResBase,
    },
    summary: '주간 키워드를 필터링해서 가져옵니다.',
    description: '날짜(from, to)로 주간 키워드 리스트를 출력합니다.',
  },

  getAnalysisHits: {
    method: 'GET',
    path: `${viewApiUrl}/:clusterNumber`,
    query: zFindVideoBySearchKeyword,
    pathParams: zClusterNumberMulti,
    responses: { 200: zCombinedViewsData, ...zErrResBase },
    summary: '기대조회수와 일일조회수를 합쳐서 불러옵니다.',
    description:
      '탐색어(keyword), 연관어(relationKeyword), 날짜(from,to),클러스터 번호(clusterNumber) 로 일일조회수,기대 조회수를 출력합니다.',
  },

  getAnalysisHitsV2: {
    method: 'GET',
    path: `${viewApiUrl}`,
    query: zFindVideoBySearchKeyword,
    responses: {
      200: zCombinedViewsDataResponse,
      ...zErrResBase,
    },
    summary: '기대조회수와 일일조회수를 합쳐서 불러옵니다.',
    description:
      '탐색어(keyword), 연관어(relationKeyword), 날짜(from,to), 클러스터분리(separation)로 일일조회수,기대 조회수를 출력합니다.',
  },
  getKeywordThisWeekly: {
    method: 'GET',
    path: `${weeklyApiUrl}/keyword`,
    query: zOnlyLimit,
    responses: { 200: zKeywordThisWeeklyRes, ...zErrResBase },
    summary: '이번주 키워드 변동량에 따른 상위 리스트를 출력합니다.',
    description:
      '이번주 키워드 변동량에 따른 상위 리스트를 출력합니다. limit로 갯수를 제한합니다. ' +
      '' +
      '기능 개요\n' +
      '\n' +
      '- 이번주 키워드\n' +
      '    - weekly_views 테이블 조회\n' +
      '        - 필터 : weekly_views 컬럼에서 10,000,000 이상\n' +
      '        - 정렬 : 순위 변동(change) 순 정렬\n' +
      '        - 제한 : limit 상위 5개 추출\n' +
      '    - 추출한 키워드의 연관어 1번 추출\n' +
      '    - 해당 키워드, 연관어1번, 변동량 표시\n' +
      '    - 클릭 시 해당 키워드 + 연관어 분석 페이지로 이동',
  },
});
