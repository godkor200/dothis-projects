import { createContext } from '@dothis/share/server/createContext';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { createTRPCNext } from '@trpc/next';
import { createReactQueryHooks } from '@trpc/react';
import { createSSGHelpers } from '@trpc/react/ssg';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';

import type { AppRouter } from '@/appRouter';
import { appRouter } from '@/appRouter';

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
});

export const trpcSSG = async (context?: trpcNext.CreateNextContextOptions) =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: context ?? (await createContext()), // { } if no context in your router
    transformer: superjson,
  });

export type inferQueryOutput<
  TRouteKey extends keyof AppRouter['_def']['queries'],
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferQueryInput<
  TRouteKey extends keyof AppRouter['_def']['queries'],
> = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferMutationInput<
  TRouteKey extends keyof AppRouter['_def']['mutations'],
> = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>;

export type inferMutationOutput<
  TRouteKey extends keyof AppRouter['_def']['mutations'],
> = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>;
