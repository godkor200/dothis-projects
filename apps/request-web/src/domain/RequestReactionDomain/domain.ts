import { z } from 'zod';

import { ReactionType } from '@/prisma/gen';

import { schema as requestPostSchema } from '../RequestPostDomain/domain';
import { schema as userSchema } from '../UserDomain/domain';

export const schema = z.object({
  requestId: requestPostSchema.shape.id,
  userId: userSchema.shape.id.optional(),
  type: z.nativeEnum(ReactionType),
  createdAt: z.date(),
});

const reactionTypeKor = {
  LIKE: '좋아요',
  DISLIKE: '싫어요',
} satisfies Record<ReactionType, unknown>;

export const constants = {
  reactionTypeKor,
};
