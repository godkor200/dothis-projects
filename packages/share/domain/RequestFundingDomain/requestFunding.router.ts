import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import UserDomain from '@/domain/UserDomain';
import { prisma } from '@/prisma/client';
import { createRouter } from '@/server/createRouter';

import RequestFundingDomain from '.';

const requestFundingRouter = createRouter()
  // 펀딩하기
  .mutation('funding', {
    input: z
      .object({
        userId: RequestFundingDomain.schema.shape.userId.unwrap(),
        requestId: RequestFundingDomain.schema.shape.requestId.unwrap(),
        quantity: RequestFundingDomain.schema.shape.quantity,
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
      return RequestFundingDomain.db.funding(input);
    },
  });

export default requestFundingRouter;
