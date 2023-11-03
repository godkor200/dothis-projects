import { t } from '@/server/trpc';
import { prisma } from '~/prisma/client';

import { schema } from '../domain';

export default t.procedure
  .input(schema.pick({ id: true }))
  .query(({ input: { id } }) =>
    prisma.requestPost.findUnique({
      where: { id },
    }),
  );
