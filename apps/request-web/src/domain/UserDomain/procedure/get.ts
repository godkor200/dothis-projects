import { z } from 'zod';

import { t } from '@/server/trpc';

import { db } from '../db';
import { schema } from '../domain';

export default t.procedure
  .input(
    z.object({
      id: schema.shape.id.nullish(),
    }),
  )
  .query(({ input: { id } }) => (id ? db.get({ where: { id } }) : null));
