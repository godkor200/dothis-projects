import type {} from 'zod';
import { c } from './contract';
import { userApi } from './user';
import { authApi } from './auth';
import { relatedWordsApi } from './related-word';
import { hitsApi } from './hits';
import { videoApi } from './video';
import { channelHistoryApi } from './channel-history';
import { channelApi } from './channel';
import { storyBoardApi } from './story-board';

// 동적으로 key에 맞는 값을 반환하는 함수

export const apiRouter = c.router({
  auth: authApi,
  user: userApi,
  hits: hitsApi,
  channelHistory: channelHistoryApi,
  channel: channelApi,
  relatedWords: relatedWordsApi,
  video: videoApi,
  storyBoard: storyBoardApi,
});
