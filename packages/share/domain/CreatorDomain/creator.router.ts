import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import type { Prisma } from '../../generated/prisma-client';
import { prisma } from '../../prisma/client';
import { createRouter } from '../../server/createRouter';
import RequestPostDomain from '../RequestPostDomain';
import UserDomain from '../UserDomain';
import CreatorDomain from '.';


export const infiniteCreatorRequestSchema = z
  .object({
    userId: z.string(),
    take: z.number().optional(),
    cursor: RequestPostDomain.schema.shape.id.optional(),
  })
  .merge(RequestPostDomain.filterSchema);

const creatorRouter = createRouter()
  // 크리에이터 전부 가져오기
  .query('get all', {
    resolve() {
      return CreatorDomain.db.getAll();
    },
  })
  // 이름이 "정확히" 매칭되는 크리에이터 정보 가져오기
  .query('match', {
    input: UserDomain.schema.pick({ name: true }).required(),
    async resolve({ input: { name } }) {
      const matchCreator = await CreatorDomain.db.match(name);
      if (matchCreator === null) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '매칭되는 크리에이터가 없습니다.',
        });
      }
      return matchCreator;
    },
  })
  // 크리에이터 이름 검색
  .query('search', {
    input: UserDomain.schema.pick({ name: true }).required(),
    async resolve({ input: { name } }) {
      return await CreatorDomain.db.searchName(name);
    },
  })
  // 크리에이터 요청 인피니티 스크롤
  .query('infinite creator request', {
    input: infiniteCreatorRequestSchema,
    async resolve({
      input: {
        userId,
        cursor,
        categoryFilter = 'ALL',
        requestFilter = 'ALL',
        order = 'LATEST',
        take = 5,
      },
    }) {
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

      // 정렬
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
                        ? RequestPostDomain.db
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
              : RequestPostDomain.db.getItems(args);
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
                    ? RequestPostDomain.db
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
            return RequestPostDomain.db.getItems(args);
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
  });

export default creatorRouter;
