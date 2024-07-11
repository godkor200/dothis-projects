import { c } from '../../lib/contract';
import { zSuccessBase } from '../../lib/success.response.zod';
import { zErrUnauthorized } from '../../lib/error.response.zod';
import { requestChannelBody } from './channel.zod';
import { zChannelErrConflict } from './channel.error.resp.zod';
export const channelApiUrl = '/channel';

export const externalChannelsApi = c.router({
  postReqChannel: {
    method: 'POST' as const,
    path: `${channelApiUrl}`,
    body: requestChannelBody,
    responses: {
      200: zSuccessBase,
      401: zErrUnauthorized,
      409: zChannelErrConflict,
    },
    summary: '크롤링될 채널정보를 post 요청을 보냅니다.',
    description: '크롤링될 채널정보를 post 요청을 보냅니다.',
  },
});
