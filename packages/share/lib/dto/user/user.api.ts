import { c } from '../contract';
import { userModel } from './user.model';

export const baseApiUrl = '/user';

export const userApi = c.router({
  getUser: {
    method: 'GET',
    path: `${baseApiUrl}/:id`,
    responses: { 200: userModel },
    summary: '유저를 가져옵니다.',
  },
});
