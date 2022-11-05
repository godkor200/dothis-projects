import { z } from 'zod';

import { schema } from '@/domain/UserDomain';
import { prisma } from '@/prisma/client';
import { t } from '@/server/trpc';

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
