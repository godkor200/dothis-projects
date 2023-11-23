import { t } from '@/server/trpc';

import Delete from './procedure/delete';
import get from './procedure/get';
import getSearchRequests from './procedure/getSearchRequests';

export const router = t.router({
  get,
  delete: Delete,
  getSearchRequests,
});
