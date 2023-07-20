import { c } from './contract';
import { userApi } from './user';
import { authApi } from './auth';
import { cacheApi } from './cache';
import { relWordsApi } from './rel-words';
import { dailyViewApi } from './daily-views/daily-views.api';
import { videoApi } from './video';

export const apiRouter = c.router({
  auth: authApi,
  user: userApi,
  cache: cacheApi,
  dailyViews: dailyViewApi,
  relwords: relWordsApi,
  video: videoApi,
});
