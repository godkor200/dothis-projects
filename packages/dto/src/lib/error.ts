import { z } from 'zod';

export const zError = z.object({
  success: z.boolean().default(false),
  statusCode: z.number().default(400),
});
