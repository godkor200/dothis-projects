import { z } from 'zod';

import { RequestPostDomain } from '@/domain';
import { prisma } from '@/prisma/client';
import { createRouter } from '@/server/createRouter';

import { createSchema, db, schema,utils } from '.';

export const router = createRouter()
  .query('view ordered items', {
    input: z.object({
      requestId: RequestPostDomain.schema.shape.id,
    }),
    async resolve({ input: { requestId } }) {
      const data = await db.getDetailItems({
        where: {
          requestId,
        },
      });
      if (data.length === 0) return null;

      return utils.makeViewComments(data);
    },
  })
  .mutation('add', {
    input: createSchema,
    resolve({ input }) {
      return prisma.requestComment.create({
        data: input,
      });
    },
  })
  .mutation('heart', {
    input: z
      .object({
        requestCommentId: schema.shape.id,
        userId: schema.shape.userId.unwrap(),
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

