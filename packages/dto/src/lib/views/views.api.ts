import { z } from 'zod';
import { c } from '../contract';
import {
  zDailyViews,
  zGetWeeklyViewsQuery,
  zWeeklyKeywordsList,
} from './views.model';
import { findVideoBySearchKeyword } from '../video';

export const viewApiUrl = '/views';
const dailyApiUrl = '/daily';
const weeklyApiUrl = '/weekly';
export const dailyViewApi = c.router({
  getDailyViews: {
    method: 'GET',
    path: `${viewApiUrl}${dailyApiUrl}/:clusterNumber`,
    pathParams: z.object({
      clusterNumber: z.string(),
    }),
    query: findVideoBySearchKeyword,
    responses: {
      200: zDailyViews,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '일일 조회수를 가져옵니다',
    description:
      '클러스터 번호(clusterNumber), 탐색어(keyword), 연관어(relationKeyword), 날짜(from,to)로 일일 조회수 를 출력합니다.',
  },
});

export const weeklyViewApi = c.router({
  getWeeklyKeywordListWithPaging: {
    method: 'GET',
    path: `${viewApiUrl}${weeklyApiUrl}-list`,
    query: zGetWeeklyViewsQuery,
    responses: {
      200: zWeeklyKeywordsList,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '주간 키워드 리스트를 가져옵니다',
    description: '날짜(from,to)로 주간 키워드 리스트를 출력합니다.',
  },
});
