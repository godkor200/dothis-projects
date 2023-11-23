import * as trpcNext from '@trpc/server/adapters/next';

import { appRouter } from '@/appRouter';
import { createContext } from '@/server/createContext';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong', error);
    }
  },
});
