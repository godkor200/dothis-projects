import { t } from '@/server/trpc';

import {
  CreatorDomain,
  RequestCommentDomain,
  RequestFundingDomain,
  RequestPostDomain,
  RequestReactionDomain,
  UserDomain,
} from '../domain';

export const appRouter = t.router({
  user: UserDomain.router,
  creator: CreatorDomain.router,
  requestPost: RequestPostDomain.router,
  requestComment: RequestCommentDomain.router,
  requestFunding: RequestFundingDomain.router,
  requestReaction: RequestReactionDomain.router,
});

export type AppRouter = typeof appRouter;
