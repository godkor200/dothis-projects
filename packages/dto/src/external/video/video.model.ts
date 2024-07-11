import { z } from 'zod';
import { maxLengthWarning } from '../../lib/error.response.zod';

export const zRequestVideoSchema = z.object({
  user_id: z.string().max(20),
  users_client_id: z
    .string()
    .max(20, maxLengthWarning(20))
    .describe('고객사에 가입된 사용자의 ID (우리의 고객사 ID와 구분됨)'),
  video_id: z.string().max(48, maxLengthWarning(48)),
  is_shorts: z.boolean().default(false).describe('0: shorts, 1: video'),
  public_flag: z
    .boolean()
    .default(false)
    .describe('0: public, 1: private')
    .optional(),
  update_date: z.date().nullable(),
});
