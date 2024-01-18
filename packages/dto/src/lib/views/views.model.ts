import { z } from 'zod';
import {
  dataObject,
  zTotalData,
  zDateQuery,
  zPaginatedQuery,
  zSortQuery,
} from '../common.model';
import * as cluster from 'cluster';

export const zDailyViewData = z.object({
  date: z.string(),
  increase_comments: z.number(),
  increase_likes: z.number(),
  increase_views: z.number(),
});

export const zDailyViews = dataObject(z.array(zDailyViewData));

const OsCommonSchema = z.object({
  _index: z.string(),
  _id: z.string(),
  _score: z.number(),
});

const createWeeklyKeywordsListSourceSchema = () => ({
  keyword: z.string().describe('탐색어'),
  category: z.string().describe('연관어'),
  weekly_views: z.number().describe('주간 조회수'),
  video_count: z.number().describe('비디오 수'),
  competitive: z.number().describe('경쟁강도'),
  mega_channel: z.number().describe('10만이상 구독자 채널 수'),
  changes: z.number().describe('순위 변동'),
});
export const SortOrderQuery = Object.keys(
  createWeeklyKeywordsListSourceSchema(),
);

export const zWeeklyKeywordsListSourceSchema = z.object(
  createWeeklyKeywordsListSourceSchema(),
);

export const zWeeklyKeywordsLisSchema = OsCommonSchema.extend({
  _source: zWeeklyKeywordsListSourceSchema,
});

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

export const zWeeklyKeywordsList = zTotalData.merge(
  dataObject(z.array(zWeeklyKeywordsListSourceSchema)),
);

const zSortWeeklyViews = zSortQuery(SortOrderQuery);

export const zGetWeeklyViewsQuery = zPaginatedQuery
  .merge(zDateQuery.pick({ from: true }))
  .merge(zSortWeeklyViews);
