import { z } from 'zod';
import { maxLengthWarning } from '../../lib/error.response.zod';

export const zRequestVideoSchema = z.object({
  user_id: z.string().max(20).describe('우리 고유 클라이언트 아이디'),
  users_client_id: z
    .string()
    .max(20, maxLengthWarning(20))
    .describe('고객사에 가입된 사용자의 ID (우리의 고객사 ID와 구분됨)'),
  video_id: z.string().max(48, maxLengthWarning(48)),
  is_shorts: z.boolean().default(false).describe('0: shorts, 1: video'),
  update_date: z.date().nullable(),
  manager_id: z.string().max(30).describe('관리자 식별 아이디'),
  operator_id: z.string().max(30).describe('운영자 식별 아이디'),
  vod_id: z.string().max(30).describe('라이브러리 식별 아이디'),
  shortform_id: z.string().max(30).describe('숏폼 식별 아이디'),
});
