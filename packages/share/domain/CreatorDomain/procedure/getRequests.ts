import type { Prisma } from '@prisma/client';
import { z } from 'zod';

import {
  filterSchema as reqeustPostFilterSchema,
  schema as requestPostSchema,
} from '../../../domain/RequestPostDomain/domain';
import { prisma } from '../../../prisma/client';
import { t } from '../../../server/trpc';
import { db as requestPostDB } from '../../RequestPostDomain/db';

export const infiniteCreatorRequestSchema = z
  .object({
    userId: z.string(),
    take: z.number().optional(),
    cursor: requestPostSchema.shape.id.optional(),
  })
  .merge(reqeustPostFilterSchema);

// 특정 크리에이터의 요청
export default t.procedure
  .input(infiniteCreatorRequestSchema)
  .query(
    async ({
      input: {
        userId,
        cursor,
        categoryFilter = 'ALL',
        requestFilter = 'ALL',
        order = 'LATEST',
        take = 5,
      },
    }) => {
      // 필터
      const AND: Prisma.RequestPostWhereInput['AND'] = [];

      if (categoryFilter !== 'ALL') {
        AND.push({
          category: categoryFilter,
        });
      }

      if (requestFilter !== 'ALL') {
        switch (requestFilter) {
          case 'ING':
            AND.push({
              status: {
                not: 'COMPLETION',
              },
            });
            break;
          case 'RESOLVED':
            AND.push({
              status: 'COMPLETION',
            });
            break;
        }
      }

      // TODO: 정렬
      const orderBy = (() => {
        switch (order) {
          case 'RECOMMEND':
            return [{}];
          case 'PAY':
            return [{}];
        }
        return [];
      })();

      const args: Omit<Prisma.RequestPostFindManyArgs, 'include'> = {
        take: take + 1,
        where: {
          creator: {
            userId,
          },
          AND,
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: 'desc',
        },
      };

      const orderedItems = await (async () => {
        switch (order) {
          case 'RECOMMEND': {
            const byMostLike = await prisma.requestReaction.groupBy({
              by: ['requestId'],
              where: {
                type: 'LIKE',
                request: args.where,
              },
              _count: { type: true },
              orderBy: { _count: { type: 'desc' } },
            });
            return byMostLike
              ? Promise.all(
                  byMostLike
                    .map(({ requestId }) =>
                      requestId
                        ? requestPostDB
                            .getItems({
                              ...args,
                              where: {
                                id: requestId!,
                              },
                            })
                            .then((items) => items[0])
                        : null,
                    )
                    .filter((item) => item !== null),
                )
              : requestPostDB.getItems(args);
          }
          case 'PAY': {
            const byFundingSum = await prisma.requestFunding.groupBy({
              by: ['requestId'],
              _sum: { quantity: true },
              orderBy: { _sum: { quantity: 'desc' } },
              where: {
                request: args.where,
              },
            });

            return Promise.all(
              byFundingSum
                .map(({ requestId }) =>
                  requestId
                    ? requestPostDB
                        .getItems({
                          ...args,
                          where: {
                            id: requestId!,
                          },
                        })
                        .then((items) => items[0])
                    : null,
                )
                .filter((item) => item !== null),
            );
          }
          case 'LATEST':
            return requestPostDB.getItems(args);
        }
      })();

      let nextCursor: typeof cursor | undefined = undefined;
      if (orderedItems.length > take) {
        const nextItem = orderedItems.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items: orderedItems,
        nextCursor,
      };
    },
  );
