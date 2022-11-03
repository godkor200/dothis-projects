import { router } from '@trpc/server';

import type { Context } from './createContext';

export function createRouter() {
  return router<Context>();
}
