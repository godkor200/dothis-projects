import { z } from 'zod';
import { zErrorBase } from '../../lib';

export const zVideoErrConflict = zErrorBase
  .extend({
    statusCode: z.literal(409),
    message: z
      .literal('The video is a duplicate and cannot be added.')
      .describe('Conflict Error'),
  })
  .describe('This schema represents a Conflict (409) error response.');
// VideoNotFound 에러 스키마 정의
export const zVideoErrNotFound = zErrorBase
  .extend({
    statusCode: z.literal(404),
    message: z.literal('The video was not found.').describe('Not Found Error'),
  })
  .describe('This schema represents a Not Found (404) error response.');
