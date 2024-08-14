import { z } from 'zod';
import { zErrorBase } from '../../lib';

export const zChannelErrConflict = zErrorBase
  .extend({
    statusCode: z.literal(409),
    message: z
      .literal('The channel is a duplicate and cannot be added.')
      .describe('Conflict Error'),
  })
  .describe('This schema represents a Conflict (409) error response.');

export const zWebhookUrlTokenMismatch = zErrorBase
  .extend({
    statusCode: z.literal(401), // Unauthorized status code
    message: z
      .literal(
        'Incoming token does not match the initially registered webhook URL token.',
      )
      .describe('Unauthorized Error due to token mismatch'),
  })
  .describe(
    'This schema represents an BadRequest (400) error response due to webhook URL token mismatch.',
  );
export const zDuplicateException = zErrorBase
  .extend({
    statusCode: z.literal(409), // Conflict 상태 코드
    message: z
      .literal('The operatorId, videoId is a duplicate and cannot be added.')
      .describe('Conflict Error due to duplicate operatorId and videoId'),
  })
  .describe(
    'This schema represents a Conflict (409) error response due to duplicate operatorId and videoId.',
  );
