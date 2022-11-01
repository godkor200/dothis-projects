import { z } from 'zod';

import {RequestPostDomain,UserDomain} from '@/domain';
import { ReactionType } from '@/generated/prisma-client';
import { strictlyOnlyRecordKey } from '@/lib/utils';

export const schema = z.object({
  requestId: RequestPostDomain.schema.shape.id,
  userId: UserDomain.schema.shape.id.optional(),
  type: z.nativeEnum(ReactionType),
  createdAt: z.date(),
});

export const constants = {
  reactionTypeKor: strictlyOnlyRecordKey<ReactionType>()({
    LIKE: '좋아요',
    DISLIKE: '싫어요',
  }),
};