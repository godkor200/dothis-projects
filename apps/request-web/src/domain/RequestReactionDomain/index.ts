import { ReactionType, RequestPost } from '@prisma/client';
import { z } from 'zod';

import RequestPostDomain from '@/domain/RequestPostDomain';
import UserDomain from '@/domain/UserDomain';
import { strictlyOnlyRecordKey } from '@/utils/common';

namespace RequestReactionDomain {
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
}

export default RequestReactionDomain;
