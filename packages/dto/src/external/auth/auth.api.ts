import { zGetAuthParams } from './auth.zod';
import { zErrResBase, zSuccessBase } from '../../lib';
import { c } from '../../lib/contract';

export const authUrl = '/auth';

export const externalAuthApi = c.router({
  getToken: {
    method: 'GET',
    path: authUrl + '/:token',
    pathParams: zGetAuthParams,
    responses: { 200: zSuccessBase, ...zErrResBase },
    summary: '두디스 api access-token을 가져옵니다.',
    description: '두디스 api access-token을 가져옵니다.',
  },
});
