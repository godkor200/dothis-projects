import { z } from 'zod';
import { c } from '../contract';
import { zChannelHistoryModel, zExpectedViews } from './channel-history.model';

export const expectedViewsApiUrl = '/expected-views';
export const channelHistoryApiUrl = '/channel-history';

export const expectedViewsApi = c.router({
  getExpectedViews: {
    method: 'GET',
    path: `${expectedViewsApiUrl}`,
    query: z.object({
      keyword: z.string(),
      relationKeyword: z.string().optional(),
      from: z.string(),
      to: z.string(),
    }),
    responses: {
      200: zExpectedViews,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '기대 조회수를 가져옵니다',
    description:
      '탐색어(keyword),연관어(relationKeyword), 날짜(from,to)로 기대 조회수 를 출력합니다. v2는 v1에 비하면 개선된 버전입니다. 전체를 불러오기 때문에 한번만 호출하면 됩니다',
  },
});

export const channelHistoryApi = c.router({
  findChannelInfo: {
    method: 'GET',
    path: `${channelHistoryApiUrl}/:channelId`,
    pathParams: z.object({ channelId: z.string() }),
    responses: {
      200: zChannelHistoryModel,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '채널 정보를 가져옵니다',
    description: '채널 정보를 출력합니다.',
  },
});
