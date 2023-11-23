import { z } from 'zod';

import { t } from '@/server/trpc';
import { prisma } from '~/prisma/client';

import { schema } from '../domain';

export default t.procedure
  .input(
    z
      .object({
        requestCommentId: schema.shape.id,
        userId: schema.shape.userId.unwrap(),
      })
      .required(),
  )
  .mutation(async ({ input: { userId, requestCommentId } }) => {
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
