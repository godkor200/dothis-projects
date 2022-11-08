import { prisma } from '../../../prisma/client';
import { t } from '../../../server/trpc';
import { createSchema } from '../domain';

export default t.procedure.input(createSchema).mutation(async ({ input }) => {
  return prisma.requestComment.create({
    data: input,
  });
});
