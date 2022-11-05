import { createSchema } from '@/domain/RequestCommentDomain';
import { prisma } from '@/prisma/client';
import { t } from '@/server/trpc';

export default t.procedure.input(createSchema).query(async ({ input }) => {
  return prisma.requestComment.create({
    data: input,
  });
});
