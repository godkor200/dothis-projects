import { schema } from '@/domain/RequestPostDomain';
import { prisma } from '@/prisma/client';
import { t } from '@/server/trpc';

export default t.procedure
  .input(schema.pick({ id: true }))
  .query(({ input: { id } }) =>
    prisma.requestPost.findUnique({
      where: { id },
    }),
  );
