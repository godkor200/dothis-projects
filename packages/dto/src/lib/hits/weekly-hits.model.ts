import { z } from 'zod';
export const zWeeklyHitsSchema = z.object({
  id: z.number().describe('조회수의 고유 식별자'),
  ranking: z.number().nullable().describe('조회수의 순위'),
  keyword: z.string().max(30).nullable().describe('조회수와 관련된 키워드'),
  category: z.string().max(30).nullable().describe('조회수의 카테고리'),
  weeklyViews: z.number().int().nullable().describe('주간 조회수'),
  videoCount: z.number().nullable().describe('동영상 수'),
  competitive: z.number().nullable().describe('경쟁 점수'),
  megaChannel: z.number().nullable().describe('메가 채널 수'),
  changes: z.number().nullable().describe('변경 수'),
  year: z.number().nullable().describe('조회수 레코드의 연도'),
  month: z.number().nullable().describe('조회수 레코드의 월'),
  day: z.number().nullable().describe('조회수 레코드의 일'),
});

export type WeeklyHitsModel = z.TypeOf<typeof zWeeklyHitsSchema>;
