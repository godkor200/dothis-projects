import { t } from '@/server/trpc';

import { db } from '../db';

export default t.procedure.query(() => {
  return db.getAll();
});
