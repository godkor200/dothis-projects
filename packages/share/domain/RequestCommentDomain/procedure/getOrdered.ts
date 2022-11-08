import { z } from 'zod';

import { db, utils } from '../../../domain/RequestCommentDomain';
import { schema as requestPostSchema } from '../../../domain/RequestPostDomain/domain';
import { t } from '../../../server/trpc';

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
