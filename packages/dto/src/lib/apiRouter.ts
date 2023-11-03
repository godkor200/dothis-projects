import type {} from 'zod';
import { c } from './contract';
import { userApi } from './user';
import { authApi } from './auth';
import { cacheApi } from './cache';
import { relWordsApi } from './rel-words';
import { dailyViewApi } from './daily-views/daily-views.api';
import { videoApi } from './video';
import { expectedViewsApi } from './channel-history';

export const apiRouter = c.router({
  auth: authApi,
  user: userApi,
  cache: cacheApi,
  dailyViews: dailyViewApi,
  expectViews: expectedViewsApi,
  relwords: relWordsApi,
  video: videoApi,
});
