import { z } from 'zod';

import { t } from '@/server/trpc';

import { schema as requestPostSchema } from '../../RequestPostDomain/domain';
import { db, utils } from '../index';

export default t.procedure
  .input(
    z.object({
      requestId: requestPostSchema.shape.id,
    }),
  )
  .query(async ({ input: { requestId } }) => {
    const data = await db.getDetailItems({
      where: {
        requestId,
      },
    });
    if (data.length === 0) return null;

    return utils.makeViewComments(data);
  });
