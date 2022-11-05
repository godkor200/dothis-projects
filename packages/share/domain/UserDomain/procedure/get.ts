import { z } from 'zod';

import { prisma } from '@/prisma/client';
import { t } from '@/server/trpc';

import { db, schema } from '..';

export default t.procedure
  .input(
    z.object({
      id: schema.shape.id.nullish(),
    }),
  )
  .query(({ input: { id } }) => (id ? db.get({ where: { id } }) : null));
