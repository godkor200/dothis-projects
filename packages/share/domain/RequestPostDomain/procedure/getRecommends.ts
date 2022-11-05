import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { db } from '@/domain/RequestPostDomain';
import { prisma } from '@/prisma/client';
import { t } from '@/server/trpc';

// 메인 해결 요청
export default t.procedure.query(() =>
  db.getItems({
    take: 30,
    where: {
      NOT: {
        status: 'COMPLETION',
      },
    },
    orderBy: [
      {
        totalLikeScroe: 'desc',
      },
      { createdAt: 'desc' },
    ],
  }),
);
