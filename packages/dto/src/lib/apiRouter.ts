import type {} from 'zod';
import { c } from './contract';
import { userApi } from './user';
import { authApi } from './auth';
import { cacheApi } from './cache';
import { relatedWordsApi } from './related-word';
import { hitsApi } from './hits';
import { videoApi } from './video';
import { channelHistoryApi } from './channel-history';
import { channelApi } from './channel';
import { storyBoardApi } from './story-board';

export const apiRouter = c.router({
  auth: authApi,
  user: userApi,
  cache: cacheApi,
  hits: hitsApi,
  channelHistory: channelHistoryApi,
  channel: channelApi,
  relatedWords: relatedWordsApi,
  video: videoApi,
  storyBoard: storyBoardApi,
});
