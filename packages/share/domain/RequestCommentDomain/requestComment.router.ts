import { z } from 'zod';

import RequestCommentDomain from '@/domain/RequestCommentDomain/index';
import RequestPostDomain from '@/domain/RequestPostDomain';
import { prisma } from '@/prisma/client';
import { createRouter } from '@/server/createRouter';

const requestCommentRouter = createRouter()
  .query('view ordered items', {
    input: z.object({
      requestId: RequestPostDomain.schema.shape.id,
    }),
    async resolve({ input: { requestId } }) {
      const data = await RequestCommentDomain.db.getDetailItems({
        where: {
          requestId,
        },
      });
      if (data.length === 0) return null;

      return RequestCommentDomain.utils.makeViewComments(data);
    },
  })
  .mutation('add', {
    input: RequestCommentDomain.createSchema,
    resolve({ input }) {
      return prisma.requestComment.create({
        data: input,
      });
    },
  })
  .mutation('heart', {
    input: z
      .object({
        requestCommentId: RequestCommentDomain.schema.shape.id,
        userId: RequestCommentDomain.schema.shape.userId.unwrap(),
      })
      .required(),
    async resolve({ input: { userId, requestCommentId } }) {
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
    },
  });

export default requestCommentRouter;
