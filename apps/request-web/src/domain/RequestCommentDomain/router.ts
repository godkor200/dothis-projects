import { t } from '@/server/trpc';

import add from './procedure/add';
import getOrdered from './procedure/getOrdered';
import toggleHeart from './procedure/toggleHeart';

export const router = t.router({
  add,
  getOrdered,
  toggleHeart,
});
