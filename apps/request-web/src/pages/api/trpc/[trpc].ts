import * as trpcNext from '@trpc/server/adapters/next';

import { createContext } from '@/server/createContext';
import { appRouter } from '@/server/routers/app.router';

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
