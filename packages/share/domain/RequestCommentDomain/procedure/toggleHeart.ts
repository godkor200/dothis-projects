import { z } from 'zod';

import { schema } from '@/domain/RequestCommentDomain';
import { prisma } from '@/prisma/client';
import { t } from '@/server/trpc';

export default t.procedure
  .input(
    z
      .object({
        requestCommentId: schema.shape.id,
        userId: schema.shape.userId.unwrap(),
      })
      .required(),
  )
  .query(async ({ input: { userId, requestCommentId } }) => {
    const heartWhere = {
      requestCommentId,
      userId,
    };

    const heart = await prisma.requestCommentHeart.findUnique({
      where: {
        requestCommentId_userId: heartWhere,
      },
    });

    if (heart) {
      return prisma.requestComment.update({
        where: {
          id: requestCommentId,
        },
        data: {
          hearts: {
            delete: {
              id: heart.id,
            },
          },
        },
      });
    }

    return prisma.requestCommentHeart.create({
      data: heartWhere,
    });
  });
