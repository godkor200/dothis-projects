import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { db } from '@/domain/RequestPostDomain';
import { prisma } from '@/prisma/client';
import { t } from '@/server/trpc';

// 메인 해결 요청
export default t.procedure.query(() =>
  db.getItems({
    take: 15,
    where: {
      status: 'COMPLETION',
    },
  }),
);
