import { apiRouter } from '@dothis/dto';
import { initClient } from '@ts-rest/core';
import type { Method } from 'axios';

import { apiBaseUrl } from '@/constants/dev';

import { apiInstance } from './apiInstance';

export const apiServer = initClient(apiRouter, {
  baseUrl: apiBaseUrl,
  baseHeaders: {},
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
