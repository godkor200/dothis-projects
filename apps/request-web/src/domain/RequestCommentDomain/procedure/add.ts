import { t } from '@/server/trpc';
import { prisma } from '~/prisma/client';

import { createSchema } from '../domain';

export default t.procedure.input(createSchema).mutation(async ({ input }) => {
  return prisma.requestComment.create({
    data: input,
  });
});
