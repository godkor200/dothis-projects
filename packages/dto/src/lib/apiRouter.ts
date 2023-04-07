import { c } from './contract';
import { userApi } from './user';
import { authApi } from './auth';
import { cacheApi } from './cache';
import { relWordsApi } from './rel-words';

export const apiRouter = c.router({
  auth: authApi,
  user: userApi,
  cache: cacheApi,
  relwords: relWordsApi,
});
