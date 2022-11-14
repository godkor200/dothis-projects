import { t } from '@/server/trpc';
import { prisma } from '~/prisma/client';

import { schema } from '../domain';

export const updateSchema = schema.pick({ id: true }).merge(
  schema.partial().pick({
    title: true,
    content: true,
    expires: true,
    solvedUrl: true,
    category: true,
    status: true,
    thumbnailUrl: true,
    refusalReason: true,
  }),
);

export default t.procedure
  .input(updateSchema)
  .mutation(async ({ input: { id, ...input } }) =>
    prisma.requestPost.update({
      where: {
        id,
      },
      data: input,
    }),
  );
