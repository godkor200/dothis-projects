import type { AuthPlatformType, Creator, Prisma } from '@prisma/client';
import { z } from 'zod';

import UserDomain from '@/domain/UserDomain';
import type { AwaitedReturn } from '@/lib/types/utilityTypes';
import { strictlyOnlyRecordKey } from '@/lib/utils/common';

import { prisma } from '../../../prisma/client';

namespace CreatorDomain {
  export type CreatorsT = AwaitedReturn<typeof db.searchName>;

  export const schema = z.object({
    id: z.bigint(),
    userId: UserDomain.schema.shape.id,
    createdAt: z.date(),
  });

  export const constants = {
    platformDetail: strictlyOnlyRecordKey<AuthPlatformType>()({
      YOUTUBE: {
        name: '유튜브',
        Component: SvgYoutube,
      },
      FACEBOOK: {
        name: '페이스북',
        Component: SvgFacebook,
      },
      INSTAGRAM: {
        name: '인스타그램',
        Component: SvgInstagram,
      },
      TWITCH: {
        name: '트위치',
        Component: SvgTwitch,
      },
    }),
  } as const;

  export const db = {
    getAll() {
      return prisma.creator.findMany({
        include: { user: true },
      });
    },
    getDetail(id: Creator['id']) {
      return prisma.creator.findUnique({
        where: { id },
        include: {
          user: true,
        },
      });
    },
    // 크리에이터별 요청 페이지네이션 & 인피티니 스크롤
    getRequestPostCursorPagination(where: Prisma.CreatorWhereUniqueInput) {
      return prisma.creator.findUnique({
        where,
        include: {
          creatorAuths: true,
          requestPosts: {
            orderBy: {
              id: 'desc',
            },
            include: {
              user: true,
              creator: {
                include: {
                  user: true,
                },
              },
              requestComments: true,
              requestApplyCreators: true,
              requestFundings: true,
              requestPlatforms: true,
              requestReactions: true,
            },
          },
        },
      });
    },
    searchName(name: string) {
      return prisma.creator.findMany({
        where: {
          user: {
            name: {
              contains: name,
            },
          },
        },
        include: {
          user: true,
        },
      });
    },
    async match(name: string) {
      const matchUser = await prisma.user.findUnique({
        where: {
          name,
        },
        include: {
          creator: {
            include: {
              user: true,
            },
          },
        },
      });
      if (matchUser?.creator) return matchUser.creator;
      return null;
    },
    setCreator(userId: string, channelId: string) {
      return prisma.creator.upsert({
        where: {
          userId: userId,
        },
        update: {},
        create: {
          userId: userId,
          creatorAuths: {
            create: {
              isMain: true,
              profileUrl: `https://www.youtube.com/channel/${channelId}`,
              platform: 'YOUTUBE',
            },
          },
        },
      });
    },
  };
}
export default CreatorDomain;
