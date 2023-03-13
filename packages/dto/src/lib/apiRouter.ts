import { c } from './contract';
import { userApi } from './user';
import { authApi } from './auth';

export const apiRouter = c.router({
  auth: authApi,
  user: userApi,
});
