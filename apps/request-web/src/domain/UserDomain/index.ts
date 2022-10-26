import type { Prisma, RequestPost } from '@prisma/client';
import { z } from 'zod';

import { prisma } from '../../../prisma/client';

namespace UserDomain {
  export const schema = z.object({
    id: z.string().cuid(),
    name: z
      .string()
      .max(30, { message: '이름은 30자를 넘길 수 없습니다.' })
      .optional(),
    email: z
      .string()
      .email({ message: '이메일 형식이 올바르지 않습니다.' })
      .optional(),
    emailVerified: z.date().optional(),
    image: z.string().optional(),
    introduction: z.string().optional(),
  });

  export const constants = {
    resignedUserName: '탈퇴한 유저',
  } as const;

  export const db = {
    get(args: Omit<Prisma.UserFindUniqueArgs, 'include'>) {
      return prisma.user.findUnique({
        ...args,
        include: {
          creator: {
            include: {
              creatorAuths: true,
            },
          },
        },
      });
    },
  };
}

export default UserDomain;
