import { z } from 'zod';
import { c } from '../contract';
import {
  zDailyViews,
  zGetWeeklyViewsQuery,
  zWeeklyKeywordsList,
} from './hits.model';
import { findVideoBySearchKeyword } from '../video';
import { zErrResBase } from '../error.response.zod';
import { zSuccessBase } from '../success.response.zod';
import { zClusterNumber } from '../common.model';

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
});
