import { z } from 'zod';
import { c } from '../contract';
import { zChannelHistoryModel, zExpectedViews } from './channel-history.model';
import { zErrResBase } from '../error.response.zod';

export const channelHistoryApiUrl = '/channel-history';
export const channelHistoryApi = c.router({
  findChannelInfo: {
    method: 'GET',
    path: `${channelHistoryApiUrl}/:channelId`,
    pathParams: z.object({ channelId: z.string() }),
    responses: {
      200: zChannelHistoryModel,
      ...zErrResBase,
    },
    summary: '채널 히스토리 정보를 가져옵니다',
    description: '채널 히스토리 정보를 출력합니다.',
  },
});
