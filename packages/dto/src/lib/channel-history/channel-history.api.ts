import { z } from 'zod';
import { c } from '../contract';

export const expectedViewsApiUrl = '/expected-views';

export const expectedViewsApi = c.router({
  getExpectedViews: {
    method: 'GET',
    path: `${expectedViewsApiUrl}/:clusterNumber`,
    pathParams: z.object({
      clusterNumber: z.string(),
    }),
    query: z.object({
      keyword: z.string(),
      relationKeyword: z.string().optional(),
      from: z.string(),
      to: z.string(),
    }),
    responses: {
      200: 'OK',
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '기대 조회수를 가져옵니다',
    description: 'params,relationKeyword, 날짜로 기대 조회수 를 출력합니다.',
  },
});
