import { z } from 'zod';

export const LOGIN_TERMS_SCHEMA = z.object({
  service: z.literal(true, {
    errorMap: () => ({ message: '서비스 이용 약관에 \n동의해주세요' }),
  }),
  privacy: z.literal(true, {
    errorMap: () => ({ message: '개인정보 처리방침에 \n동의해주세요' }),
  }),
  marketing: z.boolean().default(false),
});

export type TermsSchema = z.infer<typeof LOGIN_TERMS_SCHEMA>;
