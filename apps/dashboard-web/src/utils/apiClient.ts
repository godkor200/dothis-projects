import { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { ApiRouteResponse } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';
import type { Method } from 'axios';
import axios from 'axios';

import { apiBaseUrl } from '@/constants/dev';

export type ApiRouterResponse = ApiRouteResponse<typeof apiRouter>;

export const myAxios = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

export const apiClient = initQueryClient(apiRouter, {
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
});
