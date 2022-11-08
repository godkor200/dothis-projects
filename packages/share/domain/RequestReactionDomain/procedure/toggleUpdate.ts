import { prisma } from '../../../prisma/client';
import { t } from '../../../server/trpc';
import { schema } from '../';

export default t.procedure
  .input(schema.required().pick({ requestId: true, userId: true, type: true }))
  .mutation(async ({ input: { requestId, userId, type } }) => {
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
    // 이미 있으면 삭제
    if (reaction.type === type) {
      return prisma.requestReaction.delete({
        where: {
          userId_requestId,
        },
      });
    }
    // 없으면 추가
    return prisma.requestReaction.update({
      where: {
        userId_requestId,
      },
      data: { type },
    });
  });
