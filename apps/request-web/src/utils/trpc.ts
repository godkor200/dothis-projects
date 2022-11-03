import { createContext } from '@dothis/share/server/createContext';
import { createReactQueryHooks } from '@trpc/react';
import { createSSGHelpers } from '@trpc/react/ssg';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';

import type { AppRouter } from '@/appRouter';
import { appRouter } from '@/appRouter';


export const t = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}


export const getTrpcSSGHelpers = async (context?: trpcNext.CreateNextContextOptions) =>
  createSSGHelpers({
    router: appRouter,
    ctx: context ?? (await createContext()), // { } if no context in your router
    transformer: superjson,
  });


export type inferQueryOutput<TRouteKey extends keyof AppRouter['_def']['queries'],
  > = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferQueryInput<TRouteKey extends keyof AppRouter['_def']['queries'],
  > = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferMutationInput<TRouteKey extends keyof AppRouter['_def']['mutations'],
  > = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>;

export type inferMutationOutput<TRouteKey extends keyof AppRouter['_def']['mutations'],
  > = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>;


