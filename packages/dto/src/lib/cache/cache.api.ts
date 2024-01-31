import { c } from '../contract';
import { z } from 'zod';

export const cacheBaseApiUrl = '/cache';
export const cacheApi = c.router({
  set: {
    method: 'GET',
    path: `${cacheBaseApiUrl}/term-update`,
    responses: {
      200: c.type<any>(),
      401: c.type<{ message: string }>(),
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    summary:
      '탐색어를 redis에 업데이트 하기위해 크롤링서버에서 http 요청을 받습니다.',
    description: 'http 요청을 받아 자동으로 redis에 업데이트합니다.',
  },
  get: {
    method: 'GET',
    path: `${cacheBaseApiUrl}/term`,
    query: z.object({ key: z.string().default('dic-term') }),
    responses: {
      200: c.type<any>(),
      401: c.type<{ message: string }>(),
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    summary: '탐색어를 redis에서 불러옵니다.',
    description: '탐색어를 redis에서 불러옵니다.',
  },
});
