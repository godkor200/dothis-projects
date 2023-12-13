import { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { ApiRouteResponse } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';
import type { AxiosError, AxiosResponse, Method } from 'axios';

import { serverApiBaseUrl } from '@/constants/dev';

import { apiInstance } from './apiInstance';

export type ApiRouterResponse = ApiRouteResponse<typeof apiRouter>;

export const apiClient = (version: number) => {
  return initQueryClient(apiRouter, {
    baseUrl: serverApiBaseUrl[version],
    baseHeaders: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    api: async ({ path, method, headers, body }) => {
      try {
        const result = await apiInstance.request({
          headers,
          method: method as Method,
          url: path,
          data: body,
        });
        return { status: result.status, body: result.data };
      } catch (e: Error | AxiosError | any) {
        const error = e as AxiosError;
        const response = error.response as AxiosResponse;
        return {
          status: response.status,
          body: response.data,
        };
      }
    },
  });
};
