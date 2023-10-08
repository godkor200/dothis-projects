import { z } from 'zod';
import { c } from '../contract';

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
    summary: '데일리 뷰를 가져옵니다',
    description:
      'params relationKeyword video를 찾아 옵니다. 와서 video history 를 출력합니다. 아직 많이 느립니다. 평균 30초-40초대입니다. 구현하실떄 더미 데이터로 만 사용하세요.',
  },
});
