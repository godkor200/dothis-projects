import { z } from 'zod';
import { c } from '../contract';
import { DailyViewModel } from './daily-views.model';

export const dailyViewApiUrl = '/daily-views';

export const dailyViewApi = c.router({
  getDailyViews: {
    method: 'GET',
    path: `${dailyViewApiUrl}/:keyword`,
    pathParams: z.object({
      keyword: z.string(),
    }),
    query: z.object({
      relationKeyword: z.string().optional(),
      from: z.string(),
      to: z.string(),
    }),
    responses: {
      200: 'OK',
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '데일리 뷰를 가져옵니다. 개선 버전, 그러나 더 개선해야됨',
    description:
      'params relationKeyword video를 찾아 옵니다. 와서 video history 를 출력합니다.',
  },
});
