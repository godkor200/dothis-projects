import { apiRouter } from '@dothis/dto';
import { initClient } from '@ts-rest/core';
import type { AxiosResponseHeaders, Method } from 'axios';

import { serverApiBaseUrl } from '@/constants/dev';

import { apiInstance } from './apiInstance';

export const apiServer = (version: number) => {
  return initClient(apiRouter, {
    baseUrl: serverApiBaseUrl[version],
    baseHeaders: {},
    credentials: 'include',

    api: async ({ path, method, headers, body }) => {
      const result = await apiInstance.request({
        headers,
        method: method as Method,
        url: path,
        data: body,
      });

      const convertedHeaders = convertHeaders(
        result.headers as AxiosResponseHeaders,
      );

      const resHeaders = new Headers(convertedHeaders);
      return {
        status: result.status,
        body: result.data,
        headers: resHeaders,
      };
    },
  });
};

// Axios 응답 헤더를 Headers 클래스에 맞게 변환하는 함수
function convertHeaders(headers: AxiosResponseHeaders): Record<string, string> {
  const convertedHeaders: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    convertedHeaders[key] = value as string;
  }
  return convertedHeaders;
}
