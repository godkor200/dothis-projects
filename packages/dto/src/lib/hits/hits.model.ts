import { z } from 'zod';
import { zChannelHistoryModel } from '../channel-history';

/**
 * getDailyViewsV2 models
 */

export const zDailyViewSchema = z.object({
  date: z.string(),

  uniqueVideoCount: z
    .number()
    .describe('해당하는 날짜의 산정 비디오수(분석 영상 수)'),
  publishVideosCount: z
    .number()
    .nullable()
    .describe('해당 날짜의 발행된 비디오수'),
  increaseViews: z.number().describe('비디오 조회수'),
});

export const zRepresentativeCategorySchema = z.object({
  representativeCategory: z.string(),
});

/**
 * getWeeklyKeywordListWithPagingV1 models
 */

export const zCreateWeeklyKeywordsListSourceSchema = z
  .object({
    ranking: z.number().int().positive().describe('조회수의 순위'),
    keyword: z.string().max(30).describe('탐색어'),
    category: z.string().max(30).describe('연관어'),
    weekly_views: z.number().int().positive().describe('주간 조회수'),
    video_count: z.number().int().positive().describe('비디오 수'),
    competitive: z.number().int().describe('경쟁강도'),
    mega_channel: z
      .number()
      .int()
      .positive()
      .describe('10만이상 구독자 채널 수'),
    lastRanking: z.number().int().describe('순위 변동'),
    YEAR: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe('조회수 레코드의 연도'),
    MONTH: z
      .number()
      .int()
      .positive()
      .min(1)
      .max(12)
      .nullable()
      .describe('조회수 레코드의 월'),
    DAY: z
      .number()
      .int()
      .positive()
      .min(1)
      .max(31)
      .nullable()
      .describe('조회수 레코드의 일'),
  })
  .strict();

/**
 * getWeeklyKeywordListWithPagingV2 models
 */
export const zWeeklyKeywordSchema = z.object({
  ranking: z.number(),
  keyword: z.string(),
  category: z.string(),
  weeklyViews: z.number(),
  videoCount: z.number(),
  competitive: z.number(),
  megaChannel: z.number(),
  lastRanking: z.number(),
  year: z.number(),
  month: z.number(),
  day: z.number(),
});

export const zWeeklyKeywordsPaginationSchema = z.object({
  count: z.number(),
  limit: z.number(),
  page: z.number(),
});

/**
 * getWeeklyKeywordSome models
 */

// 스키마 는 getWeeklyKeywordListWithPagingV1와 동일

/**
 * getExpectedViews models
 */

// Schema 접미사로 바꾸고싶음
export const zExpectedViewsData = z.object({
  date: z.string().describe('yyyy-mm-dd 형식'),
  expectedHits: z.number().describe('기대 조회수'),
  maxPerformance: z.number().describe('최대 성능'),
  minPerformance: z.number().min(0).describe('최소 성능 (0 이상)'),
});

/**
 * getAnalysisHitsV2  models
 */

export const zCombinedViewsSchema = zDailyViewSchema.merge(zExpectedViewsData);

/**
 * getProbabilitySuccess models
 */

export const zGetProbabilityRes = z.object({
  totalVideoCount: z
    .number()
    .describe('전체 비디오의 수를 나타내는 숫자 값입니다.'),
  countAboveAverage: z
    .number()
    .describe(
      '평균 조회수보다 높은 조회수를 가진 비디오의 수를 나타내는 숫자 값입니다.',
    ),
});

export const zSuccessRateSchema = zGetProbabilityRes;

/**
 * getKeywordThisWeekly models
 */

export const zKeywordSchema = z.object({
  recommendedKeyword: z.string().describe('키워드'),
  topAssociatedWord: z.string().describe('1등 연관어'),
  topCategoryNumber: z.string().describe('1등 카테고리 번호'),
  ranking: z.number().describe('현재 순위'),
  year: z.number().describe('수집 연도'),
  month: z.number().describe('수집 월'),
  day: z.number().describe('수집 일'),
  changes: z.number(),
});

/**
 * ETC
 */
export type ChannelHistoryModel = z.TypeOf<typeof zChannelHistoryModel>;
