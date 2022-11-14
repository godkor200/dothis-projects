import { z } from 'zod';

import { t } from '@/server/trpc';

import { db as requestPostDB } from '../../RequestPostDomain/db';
import { schema as requestPostSchema } from '../../RequestPostDomain/domain';
import { schema } from '../domain';

export default t.procedure
  .input(
    z.object({
      userId: schema.shape.id,
      searchText: z.string().optional(),
      cursor: requestPostSchema.shape.id.optional(),
    }),
  )
  .query(async ({ input: { userId, cursor, searchText } }) => {
    const take = 5;
    const requestArg = searchText
      ? {
          OR: [
            {
              creator: {
                user: {
                  name: {
                    contains: searchText,
                  },
                },
              },
            },
            {
              title: {
                contains: searchText,
              },
            },
          ],
        }
      : undefined;

    const items = await requestPostDB.getItems({
      where: {
        user: {
          id: userId,
        },
        ...requestArg,
      },
      take: take + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: 'desc',
      },
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (items.length > take) {
      const nextItem = items.pop();
      nextCursor = nextItem!.id;
    }

    return {
      items,
      nextCursor,
    };
  });
