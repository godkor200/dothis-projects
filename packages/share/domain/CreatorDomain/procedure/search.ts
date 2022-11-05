// 크리에이터 이름 검색
import { TRPCError } from '@trpc/server';

import { UserDomain } from '@/domain';
import { db } from '@/domain/CreatorDomain';
import { t } from '@/server/trpc';

export default t.procedure
  .input(UserDomain.schema.pick({ name: true }).required())
  .query(async ({ input: { name } }) => {
    return await db.searchName(name);
  });
