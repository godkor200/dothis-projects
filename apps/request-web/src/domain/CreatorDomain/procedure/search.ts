// 크리에이터 이름 검색
import { t } from '@/server/trpc';

import { schema as userSchema } from '../../UserDomain/domain';
import { db } from '../db';

export default t.procedure
  .input(userSchema.pick({ name: true }).required())
  .mutation(async ({ input: { name } }) => {
    return await db.searchName(name);
  });
