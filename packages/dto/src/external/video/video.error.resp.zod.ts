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
