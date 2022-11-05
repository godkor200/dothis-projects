import { t } from '@/server/trpc';

import funding from './procedure/funding';

export const router = t.router({
  funding,
});
