import superjson from 'superjson';

import creatorRouter from '@/domain/CreatorDomain/creator.router';
import requestCommentRouter from '@/domain/RequestCommentDomain/requestComment.router';
import requestFundingRouter from '@/domain/RequestFundingDomain/requestFunding.router';
import requestPostRouter from '@/domain/RequestPostDomain/requestPost.router';
import requestReactionRouter from '@/domain/RequestReactionDomain/requestReaction.router';
import userRouter from '@/domain/UserDomain/user.router';

import { createRouter } from '../createRouter';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('creator - ', creatorRouter)
  .merge('request post - ', requestPostRouter)
  .merge('user - ', userRouter)
  .merge('request comment - ', requestCommentRouter)
  .merge('request funding - ', requestFundingRouter)
  .merge('request reaction - ', requestReactionRouter);

export type AppRouter = typeof appRouter;
