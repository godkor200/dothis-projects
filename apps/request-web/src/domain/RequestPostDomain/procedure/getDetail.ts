import { t } from '@/server/trpc';

import { db } from '../db';
import { schema } from '../domain';

export default t.procedure
  .input(schema.pick({ id: true }))
  .query(({ input: { id } }) =>
    db.getDetailItem({
      where: { id },
    }),
  );
