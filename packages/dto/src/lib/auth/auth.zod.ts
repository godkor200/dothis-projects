import { z } from 'zod';
// GoogleLoginRedirectRes 스키마 정의
export const GoogleLoginRedirectResponse = z.object({
  accessToken: z.string().describe('액세스 토큰'),
  refreshToken: z.string().describe('리프레시 토큰'),
  isNewUser: z.boolean().describe('새로운 사용자 여부'),
  isEnvLocal: z.boolean().describe('로컬 환경 여부'),
  googleAccessToken: z.string().describe('Google 액세스 토큰'),
  googleRefreshToken: z.string().describe('Google 리프레시 토큰'),
});
// 스키마 타입 추출
export type GoogleLoginRedirectRes = z.infer<
  typeof GoogleLoginRedirectResponse
>;
