import { authApi } from '@dothis/share/lib/dto';
import { c } from '@dothis/share/lib/dto/contract';
import type { ApiResponseForRoute, AppRoute, AppRouter } from '@ts-rest/core';
import { getRouteResponses, isAppRoute } from '@ts-rest/core';
import type { InitClientReturn } from '@ts-rest/react-query';
import { initQueryClient } from '@ts-rest/react-query';
import type { Entries, Simplify } from 'type-fest';

import { apiBaseUrl } from '@/constants/dev';

// export const apiClient = new Zodios(
//   apiBaseUrl,
//   // API definition
//   [...User.api],
// );
// export const apiHooks = new ZodiosHooks('myAPI', apiClient);

export const apiRouter = c.router({
  user: authApi,
});

type RecurApiRouterResponse<R extends AppRouter> = {
  [K in keyof R]: R[K] extends AppRoute
    ? ApiResponseForRoute<R[K]>
    : R[K] extends AppRouter
    ? RecurApiRouterResponse<R[K]>
    : never;
};

export type ApiRouterResponse = RecurApiRouterResponse<typeof apiRouter>;

export const apiClient: InitClientReturn<typeof apiRouter> = initQueryClient(
  apiRouter,
  {
    baseUrl: apiBaseUrl,
    baseHeaders: {},
  },
);
