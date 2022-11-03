import { CreatorDomain, RequestCommentDomain, RequestFundingDomain,RequestPostDomain, RequestReactionDomain, UserDomain } from '@dothis/share/domain';
import { createRouter } from '@dothis/share/server/createRouter';
import superjson from 'superjson';


export const appRouter = createRouter()
  .transformer(superjson)
  .merge('creator - ', CreatorDomain.router)
  .merge('request post - ', RequestPostDomain.router)
  .merge('user - ', UserDomain.router)
  .merge('request comment - ', RequestCommentDomain.router)
  .merge('request funding - ', RequestFundingDomain.router)
  .merge('request reaction - ', RequestReactionDomain.router);

export type AppRouter = typeof appRouter;
