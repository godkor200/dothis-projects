import { TRPCError } from '@trpc/server';

import { t } from '@/server/trpc';

import { schema as userSchema } from '../../UserDomain/domain';
import { db } from '../db';

// 이름이 "정확히" 매칭되는 크리에이터 정보 가져오기
export default t.procedure
  .input(userSchema.pick({ name: true }).required())
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
