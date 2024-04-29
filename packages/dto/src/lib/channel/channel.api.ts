import { c } from '../contract';
import { zErrResBase } from '../error.response.zod';
import { zChannelResponse } from './channel.model';
import {
  zChannelId,
  zFindVideoBySearchKeywordFindChannelClusterNumberMulti,
} from './channel.zod';

const channelApiUrl = '/channel';
export const channelApi = c.router({
  analyzeChannel: {
    method: 'GET',
    path: `${channelApiUrl}`,
    responses: {
      200: zChannelResponse,
      ...zErrResBase,
    },
    summary: '내 채널 분석 정보(snb)를 가져옵니다',
    description: '내 채널 분석 정보(snb)를 출력합니다.',
  },
  getInfluentialList: {
    method: 'GET',
    path: `${channelApiUrl}/influential`,
    query: zFindVideoBySearchKeywordFindChannelClusterNumberMulti,
    responses: {
      200: zChannelResponse,
      ...zErrResBase,
    },
    summary: '관련된 영향력있는 채널을 가져옵니다',
    description: '관련된 영향력있는 채널을 출력합니다.',
  },
});
