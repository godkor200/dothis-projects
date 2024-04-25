import { mock } from 'node:test';

import { apiRouter } from '@dothis/dto';
import { apiRouter as apiRouterDirect } from '@dothis/dto/src/lib/apiRouter';
import type {
  ApiFetcherArgs,
  ClientArgs,
  ClientInferResponseBody,
} from '@ts-rest/core';
import type { InitClientReturn } from '@ts-rest/react-query';
import { initQueryClient } from '@ts-rest/react-query';
import type { AxiosError, AxiosResponseHeaders } from 'axios';
import { type AxiosResponse, isAxiosError, type Method } from 'axios';
import type { z } from 'zod';

import { serverApiBaseUrl } from '@/constants/dev';
import { RANK_RELATIONWORD_KEY } from '@/constants/querykey';

import { apiInstance } from './apiInstance';

/**
 * @error Typescript: "The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed."
 * https://stackoverflow.com/questions/68463963/typescript-the-inferred-type-of-this-node-exceeds-the-maximum-length-the-compi
 * 해당 부분 tsconfig 에서 d.ts 를 생성하는 조건으로 핫픽스하였지만, apiClient 를 분리하거나 다른 방식으로 고안해봐야합니다.
 */
// type ApiKey = Parameters<typeof createApiRouter>[0];

type ApiFetcher = (args: ApiFetcherArgs) => Promise<{
  status: number;
  body: unknown;
  headers: Headers;
}>;

// type APIReturn<K extends ApiKey> = ReturnType<typeof createApiRouter<K>>;

export type InitClientArgs = ClientArgs & {
  /**
   * Ensures that the responses from the server match those defined in the
   * contract.
   */
  throwOnUnknownStatus?: boolean;
};

// Axios 응답 헤더를 Headers 클래스에 맞게 변환하는 함수
function convertHeaders(headers: AxiosResponseHeaders): Record<string, string> {
  const convertedHeaders: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    convertedHeaders[key] = value as string;
  }
  return convertedHeaders;
}

// RouterOption

// AppRouter
declare const tag: unique symbol;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

declare type Tagged<Token> = {
  readonly [tag]: Token;
};

export type Opaque<Type, Token = unknown> = Type & Tagged<Token>;

type MixedZodError<A, B> = Opaque<{ a: A; b: B }, 'MixedZodError'>;

/**
 * The path with colon-prefixed parameters
 * e.g. "/posts/:id".
 */
type Path = string;

declare const NullSymbol: unique symbol;
export const ContractNoBody = Symbol('ContractNoBody');

export type ContractPlainType<T> = Opaque<T, 'ContractPlainType'>;
export type ContractNullType = Opaque<typeof NullSymbol, 'ContractNullType'>;
export type ContractNoBodyType = typeof ContractNoBody;
export type ContractAnyType =
  | z.ZodSchema
  | ContractPlainType<unknown>
  | ContractNullType
  | null;
export type ContractOtherResponse<T extends ContractAnyType> = Opaque<
  { contentType: string; body: T },
  'ContractOtherResponse'
>;

export type AppRouteResponse =
  | ContractAnyType
  | ContractNoBodyType
  | ContractOtherResponse<ContractAnyType>;

type AppRouteCommon = {
  path: Path;
  pathParams?: ContractAnyType;
  query?: ContractAnyType;
  headers?: ContractAnyType;
  summary?: string;
  description?: string;
  deprecated?: boolean;
  responses: Record<number, AppRouteResponse>;
  strictStatusCodes?: boolean;
  metadata?: unknown;

  /**
   * @deprecated Use `validateResponse` on the client options
   */
  validateResponseOnClient?: boolean;
};

/**
 * A query endpoint. In REST terms, one using GET.
 */
export type AppRouteQuery = AppRouteCommon & {
  method: 'GET';
};

/**
 * A mutation endpoint. In REST terms, one using POST, PUT,
 * PATCH, or DELETE.
 */
export type AppRouteMutation = AppRouteCommon & {
  method: 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  contentType?:
    | 'application/json'
    | 'multipart/form-data'
    | 'application/x-www-form-urlencoded';
  body: ContractAnyType | ContractNoBodyType;
};

type ValidatedHeaders<
  T extends AppRoute,
  TOptions extends RouterOptions,
  TOptionsApplied = ApplyOptions<T, TOptions>,
> = 'headers' extends keyof TOptionsApplied
  ? TOptionsApplied['headers'] extends MixedZodError<infer A, infer B>
    ? {
        _error: 'Cannot mix plain object types with Zod objects for headers';
        a: A;
        b: B;
      }
    : T
  : T;

/**
 * Recursively process a router, allowing for you to define nested routers.
 *
 * The main purpose of this is to convert all path strings into string constants so we can infer the path
 */
type RecursivelyProcessAppRouter<
  T extends AppRouter,
  TOptions extends RouterOptions,
> = {
  [K in keyof T]: T[K] extends AppRoute
    ? ValidatedHeaders<T[K], TOptions>
    : T[K] extends AppRouter
    ? RecursivelyProcessAppRouter<T[K], TOptions>
    : T[K];
};

type RecursivelyApplyOptions<
  TRouter extends AppRouter,
  TOptions extends RouterOptions,
> = {
  [TRouterKey in keyof TRouter]: TRouter[TRouterKey] extends AppRoute
    ? Prettify<ApplyOptions<TRouter[TRouterKey], TOptions>>
    : TRouter[TRouterKey] extends AppRouter
    ? RecursivelyApplyOptions<TRouter[TRouterKey], TOptions>
    : TRouter[TRouterKey];
};

type UniversalMerge<A, B> = A extends z.AnyZodObject
  ? B extends z.AnyZodObject
    ? z.ZodObject<
        z.objectUtil.MergeShapes<A['shape'], B['shape']>,
        B['_def']['unknownKeys'],
        B['_def']['catchall']
      >
    : unknown extends B
    ? A
    : MixedZodError<A, B>
  : unknown extends A
  ? B
  : B extends z.AnyZodObject
  ? MixedZodError<A, B>
  : unknown extends B
  ? A
  : Prettify<Merge<A, B>>;

type ApplyOptions<
  TRoute extends AppRoute,
  TOptions extends RouterOptions,
> = Omit<TRoute, 'headers' | 'path' | 'responses'> &
  WithoutUnknown<{
    path: TOptions['pathPrefix'] extends string
      ? `${TOptions['pathPrefix']}${TRoute['path']}`
      : TRoute['path'];
    headers: UniversalMerge<TOptions['baseHeaders'], TRoute['headers']>;
    strictStatusCodes: TRoute['strictStatusCodes'] extends boolean
      ? TRoute['strictStatusCodes']
      : TOptions['strictStatusCodes'] extends boolean
      ? TOptions['strictStatusCodes']
      : unknown;
    responses: 'commonResponses' extends keyof TOptions
      ? Prettify<Merge<TOptions['commonResponses'], TRoute['responses']>>
      : TRoute['responses'];
    metadata: 'metadata' extends keyof TOptions
      ? Prettify<Merge<TOptions['metadata'], TRoute['metadata']>>
      : TRoute['metadata'];
  }>;

/**
 * A union of all possible endpoint types.
 */
export type AppRoute = AppRouteQuery | AppRouteMutation;
export type AppRouteStrictStatusCodes = Omit<AppRoute, 'strictStatusCodes'> & {
  strictStatusCodes: true;
};

/**
 * A router (or contract) in @ts-rest is a collection of more routers or
 * individual routes
 */
export type AppRouter = {
  [key: string]: AppRouter | AppRoute;
};

export type RouterOptions<TPrefix extends string = string> = {
  baseHeaders?: unknown;
  strictStatusCodes?: boolean;
  pathPrefix?: TPrefix;
  commonResponses?: Record<number, AppRouteResponse>;
  metadata?: unknown;

  /**
   * @deprecated Use `validateResponse` on the client options
   */
  validateResponseOnClient?: boolean;
};

/**
 * Differentiate between a route and a router
 *
 * @param obj
 * @returns
 */
export const isAppRoute = (obj: AppRoute | AppRouter): obj is AppRoute => {
  return 'method' in obj && 'path' in obj;
};

type NarrowObject<T> = {
  [K in keyof T]: T[K];
};

export type Merge<T, U> = Omit<T, keyof U> & U;
export type WithoutUnknown<T> = Pick<
  T,
  {
    [K in keyof T]: unknown extends Exclude<T[K], undefined> ? never : K;
  }[keyof T]
>;
