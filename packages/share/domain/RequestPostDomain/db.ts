import { RequestFundingDomain } from '@/domain';
import type { Prisma } from '@/generated/prisma-client';
import { prisma } from '@/prisma/client';

export const db = {
  async getDetailItem(args: Omit<Prisma.RequestPostFindUniqueArgs, 'include'>) {
    const data = await prisma.requestPost.findUnique({
      ...args,
      include: {
        creator: {
          include: {
            user: true,
          },
        },
        user: true,
        requestComments: {
          include: {
            user: true,
            hearts: true,
            parentComment: {
              include: {
                user: true,
              },
            },
            childrenComments: {
              orderBy: {
                createdAt: 'asc',
              },
              include: {
                childrenComments: {
                  include: {
                    childrenComments: true,
                  },
                },
              },
            },
          },
        },
        requestApplyCreators: true,
        requestFundings: {
          include: {
            user: true,
          },
        },
        requestPlatforms: true,
        requestReactions: true,
        requestInquirys: true,
        requestReports: true,
        requestBookmarks: true,
      },
    });
    if (data) {
      data.requestFundings = RequestFundingDomain.utils.quantityAmountDesc(
        RequestFundingDomain.utils.groupByFundingUsers(data.requestFundings),
      );
    }
    return data;
  },
  async getItems(args: Omit<Prisma.RequestPostFindManyArgs, 'include'>) {
    const dataList = await prisma.requestPost.findMany({
      orderBy: {
        id: 'desc',
      },
      ...args,
      include: {
        user: true,
        creator: {
          include: {
            user: true,
          },
        },
        requestComments: true,
        requestFundings: {
          include: {
            user: true,
          },
        },
        requestReactions: true,
      },
    });
    dataList.forEach((data) => {
      if (data)
        data.requestFundings = RequestFundingDomain.utils.quantityAmountDesc(
          RequestFundingDomain.utils.groupByFundingUsers(data.requestFundings),
        );
    });
    return dataList;
  },
};

export default db;
