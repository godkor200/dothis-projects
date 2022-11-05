import { z } from 'zod';

import { RequestPostDomain } from '@/domain';
import { db, utils } from '@/domain/RequestCommentDomain';
import { t } from '@/server/trpc';

export default t.procedure
  .input(
    z.object({
      requestId: RequestPostDomain.schema.shape.id,
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
