import { c } from '../contract';
import { z } from 'zod';
import { zErrResBase } from '../error.response.zod';
import { zChannelResponse } from './channel.model';

const channelApiUrl = '/channel';
export const channelApi = c.router({
  analyzeChannel: {
    method: 'GET',
    path: `${channelApiUrl}`,
    pathParams: z.object({ channelId: z.string() }),
    responses: {
      200: zChannelResponse,
      ...zErrResBase,
    },
    summary: '내 채널 분석 정보(snb)를 가져옵니다',
    description: '내 채널 분석 정보(snb)를 출력합니다.',
  },
});
