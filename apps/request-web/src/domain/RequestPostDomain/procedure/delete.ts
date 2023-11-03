import { TRPCError } from '@trpc/server';

import { t } from '@/server/trpc';
import { prisma } from '~/prisma/client';

import { RequestFundingDomain } from '../../index';
import { schema } from '../domain';

export default t.procedure
  .input(
    schema.pick({
      id: true,
    }),
  )
  .mutation(async ({ input: { id } }) => {
    const requestPost = await prisma.requestPost.findUnique({
      where: { id },
      select: {
        totalQuantity: true,
        status: true,
        requestFundings: {
          include: { user: true },
        },
      },
    });

    if (!requestPost) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: '해당 요청이 존재하지 않습니다.',
      });
    }

    if (['COMPLETION', 'ACCEPT', 'REGISTRATION'].includes(requestPost.status)) {
      const message = (() => {
        switch (requestPost.status) {
          case 'COMPLETION':
            return '해결된 요청은 삭제할 수 없습니다.';
          case 'ACCEPT':
            return '수락된 요청은 삭제할 수 없습니다.';
          case 'REGISTRATION':
            return '등록된 요청은 삭제할 수 없습니다.';
        }
      })();
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message,
      });
    }

    await Promise.all([
      prisma.requestPost.delete({
        where: {
          id,
        },
      }),
      requestPost.requestFundings.length > 0
        ? RequestFundingDomain.db.refundFundings(requestPost.requestFundings)
        : null,
    ]);
  });
