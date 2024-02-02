import { z } from 'zod';

// 기본 에러 스키마 정의
export const zSuccessBase = z.object({
  success: z.literal(true),
});
