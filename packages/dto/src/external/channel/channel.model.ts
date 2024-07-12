import { z } from 'zod';
import { maxLengthWarning } from '../../lib/error.response.zod';

export const zRequestChannelSchema = z.object({
  user_id: z
    .string({
      description: '사용자의 고유 ID',
      required_error: 'user_id는 필수 입력 항목입니다.',
    })
    .max(20, maxLengthWarning(20))
    .describe('사용자 아이디'), // varchar(20) not null
  users_client_id: z
    .string({
      description: '고객사에 가입된 사용자의 ID (우리의 고객사 ID와 구분됨)',
    })
    .max(20, maxLengthWarning(20))
    .nullable()
    .describe('고객사 사용자 아이디'), // varchar(20) null
  channel_id: z
    .string()
    .max(48, maxLengthWarning(48))
    .describe('크롤링 될 채널의 아이디'), // varchar(48) not null
  public_flag: z.boolean().default(false).nullish(), // tinyint(1) default 0 not null 허브 안에서 공개/비공개 설정
  update_date: z.string().nullable(), // timestamp null
});
