import type { ApiRouteResponse } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';
import type { Method } from 'axios';

import { serverApiBaseUrl } from '@/constants/dev';

import { apiInstance } from './apiInstance';
import { apiRouter } from '@dothis/dto/dist/lib/apiRouter';

export type ApiRouterResponse = ApiRouteResponse<typeof apiRouter>;

export const apiClient = (version: number) => {
  return initQueryClient(apiRouter, {
    baseUrl: serverApiBaseUrl[version],
    baseHeaders: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    api: async ({ path, method, headers, body }) => {
      const result = await apiInstance.request({
        headers,
        method: method as Method,
        url: path,
        data: body,
      });
      return { status: result.status, body: result.data };
    },
  });
};
