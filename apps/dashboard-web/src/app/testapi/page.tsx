'use client';

import type { createApiRouter } from '@dothis/dto';
import { apiRouter } from '@dothis/dto';
import type { ApiFetcherArgs, AppRouter } from '@ts-rest/core';
import type { UseQueryOptions } from '@ts-rest/react-query';
import { initQueryClient } from '@ts-rest/react-query';
import type { AxiosError, AxiosResponseHeaders } from 'axios';
import { type AxiosResponse, isAxiosError, type Method } from 'axios';

import { serverApiBaseUrl } from '@/constants/dev';
import { KEYWORD_KEY } from '@/constants/querykey';
import { apiInstance } from '@/utils/api/apiInstance';

function convertHeaders(headers: AxiosResponseHeaders): Record<string, string> {
  const convertedHeaders: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    convertedHeaders[key] = value as string;
  }
  return convertedHeaders;
}

type ApiKey = Parameters<typeof createApiRouter>[0];

function apiClient<K extends ApiKey>(contract_detail: K, version: number) {
  return initQueryClient(apiRouter, {
    baseUrl: serverApiBaseUrl[version],
    baseHeaders: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

    api: async ({ path, method, headers, body }: ApiFetcherArgs) => {
      try {
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
      } catch (e: Error | AxiosError | any) {
        const error = e as AxiosError;
        const response = error.response as AxiosResponse;

        const convertedHeaders = convertHeaders(
          response.headers as AxiosResponseHeaders,
        );

        const resHeaders = new Headers(convertedHeaders);
        if (isAxiosError(e)) {
          return {
            status: response.status,
            body: response.data,
            headers: resHeaders,
          };
        }
        throw e;
      }
    },
  });
}

const tt = 'test';
const Page = () => {
  const { data } = apiClient('user', 2).user.getUserKeyword.useQuery(
    KEYWORD_KEY.all,
    {},
  );

  console.log(data);
  return <div>테스트</div>;
};

export default Page;
