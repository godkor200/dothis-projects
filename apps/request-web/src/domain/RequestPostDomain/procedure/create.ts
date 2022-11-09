import { addDays } from 'date-fns';

import { t } from '@/server/trpc';
import { prisma } from '~/prisma/client';

import * as RequestFundingDomain from '../../RequestFundingDomain';
import * as UserDomain from '../../UserDomain';
import { schema } from '../domain';

export const createSchema = schema
  .pick({
    title: true,
    content: true,
    category: true,
    creatorId: true,
  })
  .extend({
    requestUserId: UserDomain.schema.shape.id,
    quantity: RequestFundingDomain.schema.shape.quantity.optional(),
  });

export default t.procedure
  .input(createSchema)
  .mutation(
    async ({ input: { requestUserId, quantity, creatorId, ...input } }) => {
      const request = await prisma.requestPost.create({
        data: {
          userId: requestUserId,
          expires: addDays(new Date(), 14),
          isUnspecified: !creatorId,
          creatorId,
          ...input,
        },
      });
      if (quantity)
        await RequestFundingDomain.db.funding({
          userId: requestUserId,
          quantity,
          requestId: request.id,
        });
      return request;
    },
  );
