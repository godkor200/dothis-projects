import { z } from 'zod';

import { RequestReportStatus, RequestReportType } from '@/prisma/gen';

import { schema as requestPostSchema } from '../RequestPostDomain/domain';
import { schema as userSchema } from '../UserDomain/domain';

export const schema = z.object({
  id: z.bigint(),
  requestId: requestPostSchema.shape.id,
  userId: userSchema.shape.id.nullish(),
  content: z.string(),
  type: z.nativeEnum(RequestReportType),
  status: z.nativeEnum(RequestReportStatus),
  createdAt: z.date(),
});

export const constants = {
  korType: new Map<RequestReportType, string>([
    ['SEXUAL', '불건전한 내용'],
    ['SLANG', '비속어 사용'],
    ['SPAMMER', '과도한 도배'],
    ['TERRORISM', '혐오감 유발'],
    ['PRIVACY', '개인정보 침해'],
    ['COPYRIGHT', '저작권 위반'],
    ['SPAM', '불법 광고'],
    ['RIOT', '분란 야기'],
    ['ETC', '기타'],
  ]),
  korStatus: new Map<RequestReportStatus, string>([
    ['PROCESSING', '신고 검토 중'],
    ['COMPLETION', "'신고 완료'"],
  ]),
} as const;
