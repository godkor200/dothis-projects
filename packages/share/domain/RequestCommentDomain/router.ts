import add from '@/domain/RequestCommentDomain/procedure/add';
import { t } from '@/server/trpc';

import getOrdered from './procedure/getOrdered';
import toggleHeart from './procedure/toggleHeart';

export const router = t.router({
  add,
  getOrdered,
  toggleHeart,
});
