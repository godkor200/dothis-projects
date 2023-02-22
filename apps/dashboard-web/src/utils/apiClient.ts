import { authApi, userApi } from '@dothis/share/lib/dto';
import { c } from '@dothis/share/lib/dto/contract';
import type { ApiRouteResponse } from '@ts-rest/core';
import type { InitClientReturn } from '@ts-rest/react-query';
import { initQueryClient } from '@ts-rest/react-query';
import type { Method } from 'axios';
import axios from 'axios';

import { apiBaseUrl } from '@/constants/dev';

// export const apiClient = new Zodios(
//   apiBaseUrl,
//   // API definition
//   [...User.api],
// );
// export const apiHooks = new ZodiosHooks('myAPI', apiClient);

export const apiRouter = c.router({
  auth: authApi,
  user: userApi,
});

export type ApiRouterResponse = ApiRouteResponse<typeof apiRouter>;

export const myAxios = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

export const apiClient: InitClientReturn<typeof apiRouter> = initQueryClient(
  apiRouter,
  {
    baseUrl: apiBaseUrl,
    baseHeaders: {
      'Content-Type': 'application/json',
    },
    async api({ path, method, headers, body }) {
      const result = await myAxios.request({
        headers,
        method: method as Method,
        url: path,
        data: body,
      });
      return { status: result.status, body: result.data };
    },
  },
);
