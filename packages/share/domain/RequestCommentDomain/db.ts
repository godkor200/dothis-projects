import type { Prisma } from '@prisma/client';

import { prisma } from '../../prisma/client';

export const db = {
  getDetailItems(args: Omit<Prisma.RequestCommentFindManyArgs, 'include'>) {
    return prisma.requestComment.findMany({
      ...args,
      include: {
        user: true,
        hearts: true,
        parentComment: {
          include: {
            user: true,
          },
        },
        childrenComments: true,
      },
    });
  },
};
