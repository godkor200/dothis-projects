import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/prisma/client';
import { createRouter } from '@/server/createRouter';

import { db, schema } from '.';

export const router = createRouter()
  // 펀딩하기
  .mutation('funding', {
    input: z
      .object({
        userId: schema.shape.userId.unwrap(),
        requestId: schema.shape.requestId.unwrap(),
        quantity: schema.shape.quantity,
      })
      .required(),
    async resolve({ input }) {
      const fundingPost = await prisma.requestPost.findUnique({
        where: { id: input.requestId },
        select: { totalQuantity: true, status: true },
      });

      if (!fundingPost)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: '매칭되는 요청이 없습니다.',
        });

      if (['EXPIRATION', 'COMPLETION', 'REFUSE'].includes(fundingPost.status)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: '펀딩이 마감된 요청입니다.',
        });
      }
      return db.funding(input);
    },
  });

