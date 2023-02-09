import { c } from '../contract';
import { z } from 'zod';
import { userModel } from './user.model';

export const baseApiUrl = '/user';

export const userApi = c.router({
  getUser: {
    method: 'GET',
    path: `${baseApiUrl}/:id`,
    pathParams: baseApiUrl,
    query: { id: z.string() },
    responses: {
      200: userModel,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '유저를 가져옵니다.',
    description: '쿼리 id로 유저를 찾아 옵니다.',
  },
});
