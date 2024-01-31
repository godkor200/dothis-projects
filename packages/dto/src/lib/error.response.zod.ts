import { z } from 'zod';
import { USER_AUTH } from './contract';

// 기본 에러 스키마 정의
const zErrorBase = z.object({
  success: z.literal(false),
  statusCode: z.number(),
  message: z.string(),
});

// Not Found 에러 스키마 정의
export const zErrNotFound = zErrorBase
  .extend({
    statusCode: z.literal(404),
    message: z
      .literal('The requested resource was not found.')
      .describe('Not Found Error'),
  })
  .describe('This schema represents a Not Found (404) error response.');

// Bad Request 에러 스키마 정의
export const zErrBadRequest = zErrorBase
  .extend({
    statusCode: z.literal(400),
    message: z
      .literal('The request cannot be processed due to bad syntax.')
      .describe('Bad Request Error'),
  })
  .describe('This schema represents a Bad Request (400) error response.');

// Unauthorized 에러 스키마 정의
export const zErrUnauthorized = zErrorBase
  .extend({
    statusCode: z.literal(401),
    message: z
      .enum([USER_AUTH.AccessTokenExpired, USER_AUTH.RefreshTokenExpired])
      .describe('Unauthorized Error'),
  })
  .describe('This schema represents an Unauthorized (401) error response.');

// Internal Server Error 에러 스키마 정의
export const zErrInternalServer = zErrorBase
  .extend({
    statusCode: z.literal(500),
    message: z
      .literal('An unexpected condition was encountered.')
      .describe('Internal Server Error'),
  })
  .describe(
    'This schema represents an Internal Server Error (500) error response.',
  );

export const zErrResBase = {
  404: zErrNotFound,
  400: zErrBadRequest,
  401: zErrUnauthorized,
  500: zErrInternalServer,
};
