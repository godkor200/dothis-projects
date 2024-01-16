import { z } from 'zod';
import {
  dataObject,
  zTotalData,
  dateQuery,
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
  keyword: z.string(),
  category: z.string(),
  weekly_views: z.number(),
  video_count: z.number(),
  competitive: z.number(),
  mega_channel: z.number(),
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
  .merge(dateQuery.pick({ from: true }))
  .merge(zSortWeeklyViews);
