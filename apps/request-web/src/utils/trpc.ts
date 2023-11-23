import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { createTRPCNext } from '@trpc/next';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';

import type { AppRouter } from '@/appRouter';
import { appRouter } from '@/appRouter';
import { createContext } from '@/server/createContext';

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    const url =
      typeof window !== 'undefined'
        ? '/api/trpc'
        : `${process.env.NEXTAUTH_URL}/api/trpc`;

    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) => process.env.NODE_ENV === 'development',
        }),
        httpBatchLink({
          url,
        }),
      ],
    };
  },
  ssr: false,
});

export const trpcSSG = async (context?: trpcNext.CreateNextContextOptions) =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: context ?? (await createContext()), // { } if no context in your router
    transformer: superjson,
  });

export type inferQueryOutput = inferRouterOutputs<AppRouter>;

export type inferQueryInput = inferRouterInputs<AppRouter>;
