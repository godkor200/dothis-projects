import type { Prisma, RequestFunding, RequestPost, User } from '@/prisma/gen';
import { prisma } from '~/prisma/client';

export const db = {
  async funding({
    userId,
    requestId,
    quantity,
  }: {
    userId: User['id'];
    requestId: RequestPost['id'];
    quantity: RequestFunding['quantity'];
  }) {
    return prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          totalPoint: {
            decrement: quantity,
          },
        },
      }),
      prisma.requestPost.update({
        where: { id: requestId },
        data: {
          totalQuantity: {
            increment: quantity,
          },
          requestFundings: {
            create: {
              userId,
              quantity,
            },
          },
        },
      }),
    ]);
  },
  refundFundings(requestFundings: (RequestFunding & { user: User | null })[]) {
    const userRefundQuantity = requestFundings.reduce(
      (pv, { user, quantity }) => {
        if (user)
          pv.push(
            prisma.user.update({
              where: { id: user.id },
              data: {
                totalPoint: {
                  increment: quantity,
                },
              },
            }),
          );
        return pv;
      },
      [] as Prisma.Prisma__UserClient<User>[],
    );

    return prisma.$transaction([
      ...userRefundQuantity,
      prisma.requestFunding.updateMany({
        where: {
          id: {
            in: requestFundings.map(({ id }) => id),
          },
        },
        data: {
          status: 'CANCELED',
        },
      }),
    ]);
  },
};
