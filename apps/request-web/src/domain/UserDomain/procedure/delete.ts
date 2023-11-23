import { z } from 'zod';

import { t } from '@/server/trpc';
import { prisma } from '~/prisma/client';

import { schema } from '../domain';

export default t.procedure
  .input(
    z.object({
      id: schema.shape.id,
    }),
  )
  .mutation(({ input: { id }, ctx }) =>
    prisma.user.delete({
      where: {
        id,
      },
    }),
  );
