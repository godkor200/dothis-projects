import { TRPCError } from '@trpc/server';

import { UserDomain } from '@/domain';
import { db } from '@/domain/CreatorDomain';
import { t } from '@/server/trpc';

// 이름이 "정확히" 매칭되는 크리에이터 정보 가져오기
export default t.procedure
  .input(UserDomain.schema.pick({ name: true }).required())
  .query(async ({ input: { name } }) => {
    const matchCreator = await db.match(name);
    if (matchCreator === null) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: '매칭되는 크리에이터가 없습니다.',
      });
    }
    return matchCreator;
  });
