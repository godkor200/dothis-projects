import Delete from '../../domain/UserDomain/procedure/delete';
import { t } from '../../server/trpc';
import get from './procedure/get';
import getSearchRequests from './procedure/getSearchRequests';

export const router = t.router({
  get,
  delete: Delete,
  getSearchRequests,
});
