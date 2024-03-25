import { c } from '../contract';
import { zDailyViews, zWeeklyKeywordsList } from './hits.model';
import { findVideoBySearchKeyword, zFindVideoBySearchKeyword } from '../video';
import { zErrResBase } from '../error.response.zod';
import { zSuccessBase } from '../success.response.zod';
import { zClusterNumber, zClusterNumberMulti } from '../common.model';
import { zGetWeeklyViewsQuery } from './hits.zod';
import { zExpectedViews } from '../channel-history';

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
      200: zSuccessBase.merge(zDailyViews),
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
      200: zDailyViews,
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
      '탐색어(keyword),연관어(relationKeyword), 날짜(from,to)로 기대 조회수 를 출력합니다. v2는 v1에 비하면 개선된 버전입니다. 전체를 불러오기 때문에 한번만 호출하면 됩니다',
  },
  getProbabilitySuccess: {
    method: 'GET',
    path: `${viewApiUrl}/:clusterNumber/success-rate`,
    query: zFindVideoBySearchKeyword,
    pathParams: zClusterNumberMulti,
    responses: {
      200: zExpectedViews,
      ...zErrResBase,
    },
    summary: '관련어, 연관어 영상들의 성공확률을 가져옵니다',
    description:
      '탐색어(keyword),연관어(relationKeyword), 날짜(from,to)로 성공 확률을 가져옵니다.',
  },
});
