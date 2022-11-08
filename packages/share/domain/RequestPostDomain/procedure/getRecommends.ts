import { t } from '../../../server/trpc';
import { db } from '../db';

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
