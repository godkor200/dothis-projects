import { createRouter } from '@dothis/share/server/createRouter';
import superjson from 'superjson';


export const appRouter = createRouter()
  .transformer(superjson)
  .merge('creator - ', creatorRouter)
  .merge('request post - ', requestPostRouter)
  .merge('user - ', userRouter)
  .merge('request comment - ', requestCommentRouter)
  .merge('request funding - ', requestFundingRouter)
  .merge('request reaction - ', requestReactionRouter);

export type AppRouter = typeof appRouter;
