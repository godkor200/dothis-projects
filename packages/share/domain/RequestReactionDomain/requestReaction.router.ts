import { prisma } from '@/prisma/client';
import { createRouter } from '@/server/createRouter';

import RequestReactionDomain from '.';

const requestReactionRouter = createRouter().mutation('update', {
  input: RequestReactionDomain.schema
    .required()
    .pick({ requestId: true, userId: true, type: true }),
  async resolve({ input: { requestId, userId, type } }) {
    const userId_requestId = {
      userId,
      requestId,
    };

    const reaction = await prisma.requestReaction.findUnique({
      where: {
        userId_requestId,
      },
    });

    if (!reaction) {
      return prisma.requestReaction.create({
        data: {
          userId,
          requestId,
          type,
        },
      });
    }
    if (reaction.type === type) {
      return prisma.requestReaction.delete({
        where: {
          userId_requestId,
        },
      });
    }
    return prisma.requestReaction.update({
      where: {
        userId_requestId,
      },
      data: { type },
    });
  },
});
export default requestReactionRouter;
