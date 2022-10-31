import { z } from 'zod';

import RequestPostDomain from '@/domain/RequestPostDomain';
import UserDomain from '@/domain/UserDomain/index';
import { prisma } from '@/prisma/client';
import { createRouter } from '@/server/createRouter';

const userRouter = createRouter()
  .query('get', {
    input: z.object({
      id: UserDomain.schema.shape.id.nullish(),
    }),
    resolve({ input: { id } }) {
      return id ? UserDomain.db.get({ where: { id } }) : null;
    },
  })
  .query('infinite search user request', {
    input: z.object({
      userId: UserDomain.schema.shape.id,
      searchText: z.string().optional(),
      cursor: RequestPostDomain.schema.shape.id.optional(),
    }),
    async resolve({ input: { userId, cursor, searchText } }) {
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

      const items = await RequestPostDomain.db.getItems({
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
    },
  })
  .mutation('delete', {
    input: z.object({
      id: UserDomain.schema.shape.id,
    }),
    resolve({ input: { id }, ctx }) {
      return prisma.user.delete({
        where: {
          id,
        },
      });
    },
  });

export default userRouter;
