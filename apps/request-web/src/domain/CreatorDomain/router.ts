import { t } from '@/server/trpc';

import getAll from './procedure/getAll';
import getMatched from './procedure/getMatched';
import getRequests from './procedure/getRequests';
import search from './procedure/search';

export const router = t.router({
  getAll,
  getMatched,
  getRequests,
  search,
});
