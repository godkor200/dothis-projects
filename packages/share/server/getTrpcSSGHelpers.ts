import { createSSGHelpers } from '@trpc/react/ssg';
import type * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';

import { createContext } from './createContext';
import { appRouter } from './routers/app.router';

const getTrpcSSGHelpers = async (context?: trpcNext.CreateNextContextOptions): Promise<ReturnType<typeof createSSGHelpers>> =>
  createSSGHelpers({
    router: appRouter,
    ctx: context ?? (await createContext()), // { } if no context in your router
    transformer: superjson,
  });

export default getTrpcSSGHelpers;
