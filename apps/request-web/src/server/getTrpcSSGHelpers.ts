import { createSSGHelpers } from '@trpc/react/ssg';
import type * as trpcNext from '@trpc/server/adapters/next';
import type { GetServerSidePropsContext } from 'next/types';
import superjson from 'superjson';

import { createContext } from '@/server/createContext';
import { appRouter } from '@/server/routers/app.router';

const getTrpcSSGHelpers = async (context?: trpcNext.CreateNextContextOptions) =>
  createSSGHelpers({
    router: appRouter,
    ctx: context ?? (await createContext()), // { } if no context in your router
    // transformer: superjson,
  });

export default getTrpcSSGHelpers;
