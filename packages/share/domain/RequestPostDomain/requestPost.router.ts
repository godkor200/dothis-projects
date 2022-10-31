import { TRPCError } from '@trpc/server';
import { addDays } from 'date-fns';
import { groupBy } from 'fp-ts/lib/NonEmptyArray';
import { z } from 'zod';

import RequestFundingDomain from '@/domain/RequestFundingDomain';
import RequestPostDomain from '@/domain/RequestPostDomain/index';
import UserDomain from '@/domain/UserDomain';
import { prisma } from '@/prisma/client';
import { createRouter } from '@/server/createRouter';

const requestPostRouter = createRouter()
  // 메인 해결 요청
  .query('main solved items', {
    async resolve() {
      return RequestPostDomain.db.getItems({
        take: 15,
        where: {
          status: 'COMPLETION',
        },
      });
    },
  })
  .query('get item', {
    input: RequestPostDomain.schema.pick({ id: true }),
    async resolve({ input }) {
      return prisma.requestPost.findUnique({
        where: { id: input.id },
      });
    },
  })
  // 메인 추천 요청
  .query('main recommend items', {
    resolve() {
      return RequestPostDomain.db.getItems({
        take: 20,
        where: {
          status: {
            notIn: ['COMPLETION', 'EXPIRATION', 'REFUSE'],
          },
        },
      });
    },
  })
  .query('detail item', {
    input: RequestPostDomain.schema.pick({ id: true }),
    resolve({ input: { id } }) {
      return RequestPostDomain.db.getDetailItem({ where: { id } });
    },
  })
  // 특정 크리에이터한테 요청한 유저의 아이템을 가져옴
  .query('user items requested by the creator', {
    input: z.object({
      userId: UserDomain.schema.shape.id.nullish(),
      creatorUserId: UserDomain.schema.shape.id,
    }),
    resolve({ input: { userId, creatorUserId } }) {
      if (!userId) return null;
      return RequestPostDomain.db.getItems({
        take: 3,
        where: {
          creator: {
            userId: creatorUserId,
          },
          user: {
            id: userId,
          },
        },
      });
    },
  })
  // 생성
  .mutation('create', {
    input: RequestPostDomain.schema
      .pick({
        title: true,
        content: true,
        category: true,
        creatorId: true,
      })
      .extend({
        requestUserId: UserDomain.schema.shape.id,
        quantity: RequestFundingDomain.schema.shape.quantity.optional(),
      }),
    async resolve({ input: { requestUserId, quantity, creatorId, ...input } }) {
      const request = await prisma.requestPost.create({
        data: {
          userId: requestUserId,
          expires: addDays(new Date(), 14),
          isUnspecified: !creatorId,
          creatorId,
          ...input,
        },
      });
      if (quantity)
        await RequestFundingDomain.db.funding({
          userId: requestUserId,
          quantity,
          requestId: request.id,
        });
      return request;
    },
  })
  .mutation('update status', {
    input: RequestPostDomain.schema.pick({
      id: true,
      status: true,
      refusalReason: true,
      solvedUrl: true,
      creatorId: true,
    }),
    async resolve({ input: { id, ...data } }) {
      if (data.status === 'REFUSE') {
        const requestPost = await prisma.requestPost.findUnique({
          where: { id },
        });
        if (!requestPost) throw new TRPCError({ code: 'NOT_FOUND' });

        return prisma.requestPost.update({
          where: { id },
          data: {
            ...data,
            status: 'REQUEST',
            creatorId: null,
          },
        });
      }

      return prisma.requestPost.update({
        where: { id },
        data,
      });
    },
  })
  // 요청 완료, 크리에이터에게 펀딩액 지급
  .mutation('complete', {
    input: RequestPostDomain.schema.pick({
      id: true,
    }),
    async resolve({ input: { id } }) {
      const request = await prisma.requestPost.findUnique({
        where: { id },
        include: {
          requestFundings: {
            where: {
              status: 'FUNDING',
            },
            include: {
              user: true,
            },
          },
          creator: true,
        },
      });

      if (!request?.creator?.userId)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '포인트를 지급할 크리에이터를 찾을 수 없습니다.',
        });

      const fundingsGroupByUserIdData = groupBy(
        (funding: typeof request.requestFundings[number]) =>
          funding.user?.id ?? UserDomain.constants.resignedUserName,
      )(request.requestFundings);

      const prismaFundingQueryies = Object.entries(
        fundingsGroupByUserIdData,
      ).map(([userId, userFundings]) => {
        const totalFundingPoints = userFundings.reduce(
          (acc, cur) => acc + cur.quantity,
          0,
        );
        return [
          prisma.requestFunding.updateMany({
            where: {
              id: {
                in: userFundings.map(({ id }) => id),
              },
            },
            data: {
              status: 'COMPLETION',
            },
          }),
          prisma.user.update({
            where: {
              id: request.creator!.userId,
            },
            data: {
              totalPoint: {
                increment: totalFundingPoints,
              },
            },
          }),
        ];
      });
      return prisma.$transaction([
        prisma.requestPost.update({
          where: { id },
          data: { status: 'COMPLETION' },
        }),
        ...prismaFundingQueryies.flat(),
      ]);
    },
  })
  // 수정
  .mutation('update', {
    input: RequestPostDomain.schema.pick({ id: true }).merge(
      RequestPostDomain.schema.partial().pick({
        title: true,
        content: true,
        expires: true,
        solvedUrl: true,
        category: true,
        status: true,
        thumbnailUrl: true,
        refusalReason: true,
      }),
    ),
    resolve({ input: { id, ...input } }) {
      return prisma.requestPost.update({
        where: {
          id,
        },
        data: input,
      });
    },
  })
  // 삭제
  .mutation('delete', {
    input: RequestPostDomain.schema.pick({
      id: true,
    }),
    async resolve({ input: { id } }) {
      const requestPost = await prisma.requestPost.findUnique({
        where: { id },
        select: {
          totalQuantity: true,
          status: true,
          requestFundings: {
            include: { user: true },
          },
        },
      });

      if (!requestPost) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: '해당 요청이 존재하지 않습니다.',
        });
      }

      if (
        ['COMPLETION', 'ACCEPT', 'REGISTRATION'].includes(requestPost.status)
      ) {
        const message = (() => {
          switch (requestPost.status) {
            case 'COMPLETION':
              return '해결된 요청은 삭제할 수 없습니다.';
            case 'ACCEPT':
              return '수락된 요청은 삭제할 수 없습니다.';
            case 'REGISTRATION':
              return '등록된 요청은 삭제할 수 없습니다.';
          }
        })();
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message,
        });
      }

      Promise.all([
        prisma.requestPost.delete({
          where: {
            id,
          },
        }),
        requestPost.requestFundings.length > 0
          ? RequestFundingDomain.db.refundFundings(requestPost.requestFundings)
          : null,
      ]);
    },
  });
export default requestPostRouter;
