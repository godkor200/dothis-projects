import { z } from 'zod';
import { UnauthorizedErrorType, USER_AUTH } from './contract';

// 기본 에러 스키마 정의
export const zErrorBase = z.object({
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
    message: z.enum([USER_AUTH.Unauthorized]).describe('unauthorized token'),
  })
  .describe('This schema represents an Unauthorized (401) error response.');

// 토큰 만료 에러 스키마 정의
export const zErrForbidden = z
  .object({
    statusCode: z.literal(403),
    message: z
      .enum([USER_AUTH.AccessTokenExpired, USER_AUTH.AccessTokenExpired])
      .describe('token expired'),
  })
  .describe('This schema represents a Forbidden (403) error response.');

// Internal Server Error 에러 스키마 정의
export const zErrInternalServer = zErrorBase
  .extend({
    statusCode: z.literal(500),
    message: z
      .literal('Internal Server Error')
      .describe('Internal Server Error'),
  })
  .describe(
    'This schema represents an Internal Server Error (500) error response.',
  );
export const maxLengthWarning = (maxLength: number) => {
  return { message: `최대 ${maxLength}자까지 입력이 가능합니다.` };
};
export const zErrResBase = {
  404: zErrNotFound,
  400: zErrBadRequest,
  401: zErrUnauthorized,
  500: zErrInternalServer,
};
