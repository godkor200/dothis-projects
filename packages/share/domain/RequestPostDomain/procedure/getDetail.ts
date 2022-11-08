import { db, schema } from '../../../domain/RequestPostDomain';
import { t } from '../../../server/trpc';

export default t.procedure
  .input(schema.pick({ id: true }))
  .query(({ input: { id } }) =>
    db.getDetailItem({
      where: { id },
    }),
  );
