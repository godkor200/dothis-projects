// 크리에이터 이름 검색
import { TRPCError } from '@trpc/server';

import { schema as userSchema } from '../../../domain/UserDomain/domain';
import { t } from '../../../server/trpc';
import { db } from '../db';

export default t.procedure
  .input(userSchema.pick({ name: true }).required())
  .mutation(async ({ input: { name } }) => {
    return await db.searchName(name);
  });
