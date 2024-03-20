import { z } from 'zod';
import {
  dataObject,
  zTotalData,
  zDateQuery,
  zPaginatedQuery,
  zSortQuery,
  zPaginatedOffsetQuery,
} from '../common.model';

export const zDailyViewData = z.object({
  date: z.string(),
  videoViews: z.number().describe('비디오 조회수'),
  uniqueVideoCount: z.number().describe('해당하는 날짜의 산정 비디오수'),
});

export const zDailyViews = dataObject(z.array(zDailyViewData));

const OsCommonSchema = z.object({
  _index: z.string(),
  _id: z.string(),
  _score: z.number(),
});

/**
 * weekly-view models
 */
export const zCreateWeeklyKeywordsListSourceSchema = z
  .object({
    id: z.number().int().positive().describe('조회수의 고유 식별자'),
    ranking: z.number().int().positive().nullable().describe('조회수의 순위'),
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
    changes: z.number().int().describe('순위 변동'),
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
export const SortOrderQuery = Object.keys(
  zCreateWeeklyKeywordsListSourceSchema.shape,
);

export const zWeeklyKeywordsListSourceSchema =
  zCreateWeeklyKeywordsListSourceSchema;

export const zWeeklyKeywordsListArray = z.array(
  zCreateWeeklyKeywordsListSourceSchema,
);
export const zWeeklyKeywordsList = zTotalData.merge(
  dataObject(zWeeklyKeywordsListArray),
);

const VideoHistorySourceSchema = OsCommonSchema.extend({
  video_id: z.string(),
  video_views: z.number(),
  video_likes: z.number(),
  video_comments: z.number(),
  crawled_date: z.string(),
  performance: z.number(),
});

export const zVideoHistory = OsCommonSchema.extend({
  _source: VideoHistorySourceSchema,
});

export type DailyViewModel = z.TypeOf<typeof zDailyViews>;

export const zSortWeeklyViews = zSortQuery(SortOrderQuery);
export type WeeklyHitsModel = z.TypeOf<typeof zWeeklyKeywordsListSourceSchema>;
