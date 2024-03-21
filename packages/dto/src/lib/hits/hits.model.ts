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

  uniqueVideoCount: z.number().describe('해당하는 날짜의 산정 비디오수'),

  increaseComments: z.number().describe('비디오 코멘트 수'),

  increaseLikes: z.number().describe('비디오 좋아요 수'),

  increaseViews: z.number().describe('비디오 조회수'),
});

export const zDailyViews = dataObject(z.array(zDailyViewData));

const OsCommonSchema = z.object({
  _index: z.string(),
  _id: z.string(),
  _score: z.number(),
});

const createWeeklyKeywordsListSourceSchema = {
  id: z.number().describe('조회수의 고유 식별자'),
  ranking: z.number().nullable().describe('조회수의 순위'),
  keyword: z.string().describe('탐색어'),
  category: z.string().describe('연관어'),
  weekly_views: z.number().describe('주간 조회수'),
  video_count: z.number().describe('비디오 수'),
  competitive: z.number().describe('경쟁강도'),
  mega_channel: z.number().describe('10만이상 구독자 채널 수'),
  changes: z.number().describe('순위 변동'),
  YEAR: z.number().nullable().describe('조회수 레코드의 연도'),
  MONTH: z.number().nullable().describe('조회수 레코드의 월'),
  DAY: z.number().nullable().describe('조회수 레코드의 일'),
};
export const SortOrderQuery = Object.keys(createWeeklyKeywordsListSourceSchema);

export const zWeeklyKeywordsListSourceSchema = z.object(
  createWeeklyKeywordsListSourceSchema,
);

export const zWeeklyKeywordsList = zTotalData.merge(
  dataObject(z.array(zWeeklyKeywordsListSourceSchema)),
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
