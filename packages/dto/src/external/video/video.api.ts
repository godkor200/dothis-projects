import { zSuccessBase, zErrResBase, zErrUnauthorized, c } from '../../lib/';
import { requestVideoBody, zVideoErrConflict } from './';

const zVideoErrRes = { 401: zErrUnauthorized, 409: zVideoErrConflict };

export const VideoApiUrl = '/video';
export const externalVideoApi = c.router({
  postReqVideo: {
    method: 'POST' as const,
    path: `${VideoApiUrl}`,
    body: requestVideoBody,
    responses: { 200: zSuccessBase, ...zVideoErrRes },
    summary: '크롤링될 영상정보를 post 요청을 보냅니다.',
    description: '크롤링될 영상정보를 post 요청을 보냅니다.',
  },
});
