import { c } from '@lib/dto/contract';
import { userModel } from '@lib/dto/user/user.model';

export const baseApiUrl = '/v1/user';

export const userApi = c.router({
  getUser: {
    method: 'GET',
    path: `${baseApiUrl}/:id`,
    responses: { 200: userModel },
    summary: '유저를 가져옵니다.',
  },
});
