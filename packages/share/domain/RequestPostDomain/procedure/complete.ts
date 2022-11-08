import { TRPCError } from '@trpc/server';
import { groupBy } from 'fp-ts/NonEmptyArray';

import { constants as userConstants } from '../../../domain/UserDomain/domain';
import { prisma } from '../../../prisma/client';
import { t } from '../../../server/trpc';
import { schema } from '../domain';

// 요청 완료, 크리에이터에게 펀딩액 지급
export default t.procedure
  .input(
    schema.pick({
      id: true,
    }),
  )
  .mutation(async ({ input: { id } }) => {
    const request = await prisma.requestPost.findUnique({
      where: { id },
      include: {
        requestFundings: {
          where: {
            status: 'FUNDING',
          },
          include: {
            user: true,
          },
        },
        creator: true,
      },
    });

    if (!request?.creator?.userId)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: '포인트를 지급할 크리에이터를 찾을 수 없습니다.',
      });

    const fundingsGroupByUserIdData = groupBy(
      (funding: typeof request.requestFundings[number]) =>
        funding.user?.id ?? userConstants.resignedUserName,
    )(request.requestFundings);

    const prismaFundingQueryies = Object.entries(fundingsGroupByUserIdData).map(
      ([userId, userFundings]) => {
        const totalFundingPoints = userFundings.reduce(
          (acc, cur) => acc + cur.quantity,
          0,
        );
        return [
          prisma.requestFunding.updateMany({
            where: {
              id: {
                in: userFundings.map(({ id }) => id),
              },
            },
            data: {
              status: 'COMPLETION',
            },
          }),
          prisma.user.update({
            where: {
              id: request.creator!.userId,
            },
            data: {
              totalPoint: {
                increment: totalFundingPoints,
              },
            },
          }),
        ];
      },
    );
    return prisma.$transaction([
      prisma.requestPost.update({
        where: { id },
        data: { status: 'COMPLETION' },
      }),
      ...prismaFundingQueryies.flat(),
    ]);
  });
