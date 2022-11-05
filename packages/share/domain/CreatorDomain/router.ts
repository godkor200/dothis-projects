import { t } from '@/server/trpc';

import getAll from './procedure/getAll';
import getMatched from './procedure/getMatched';
import requests from './procedure/requests';
import search from './procedure/search';

export const router = t.router({
  getAll,
  getMatched,
  requests,
  search,
});
