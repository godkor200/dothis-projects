import { db } from '@/domain/CreatorDomain';
import { t } from '@/server/trpc';

export default t.procedure.query(() => {
  return db.getAll();
});
