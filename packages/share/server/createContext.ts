  import type * as trpc from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

export async function createContext(
  context?: trpcNext.CreateNextContextOptions,
) {
  return {
    // req,
    // res,
    // prisma,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
