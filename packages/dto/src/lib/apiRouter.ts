import type {} from 'zod';
import { c } from './contract';
import { userApi } from './user';
import { authApi } from './auth';
import { cacheApi } from './cache';
import { relWordsApi } from './rel-words';
import { dailyViewApi } from './daily-views/daily-views.api';
import { videoApi } from './video';
import { channelHistoryApi, expectedViewsApi } from './channel-history';
import { channelApi } from './channel/channel.api';

export const apiRouter = c.router({
  auth: authApi,
  user: userApi,
  cache: cacheApi,
  dailyViews: dailyViewApi,
  channelHistory: channelHistoryApi,
  channel: channelApi,
  expectViews: expectedViewsApi,
  relwords: relWordsApi,
  video: videoApi,
});
