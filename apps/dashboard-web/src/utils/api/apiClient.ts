import { apiRouter } from '@dothis/dto';
import type { ApiFetcherArgs } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';
import type { AxiosError, AxiosResponseHeaders } from 'axios';
import { type AxiosResponse, isAxiosError, type Method } from 'axios';

import { serverApiBaseUrl } from '@/constants/dev';

import { apiInstance } from './apiInstance';

/**
 * @error Typescript: "The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed."
 * https://stackoverflow.com/questions/68463963/typescript-the-inferred-type-of-this-node-exceeds-the-maximum-length-the-compi
 * 해당 부분 tsconfig 에서 d.ts 를 생성하는 조건으로 핫픽스하였지만, apiClient 를 분리하거나 다른 방식으로 고안해봐야합니다.
 */
export const apiClient = (version: number) => {
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
};

// Axios 응답 헤더를 Headers 클래스에 맞게 변환하는 함수
function convertHeaders(headers: AxiosResponseHeaders): Record<string, string> {
  const convertedHeaders: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    convertedHeaders[key] = value as string;
  }
  return convertedHeaders;
}
