import {
  dataObject,
  zCategoryNumberMulti,
  zClustersObject,
  zDateQuery,
  zKeywordsMulti,
  zPaginatedOffsetQuery,
  zSortQuery,
  zTotalData,
} from '../common.model';
import {
  zDailyViewSchema,
  zRepresentativeCategorySchema,
  zCreateWeeklyKeywordsListSourceSchema,
  zWeeklyKeywordSchema,
  zWeeklyKeywordsPaginationSchema,
  zExpectedViewsData,
  zCombinedViewsSchema,
  zSuccessRateSchema,
  zKeywordSchema,
} from './hits.model';
import { z } from 'zod';
import { zSuccessBase } from '../success.response.zod';

/**
 * getDailyViewsV2 Zod
 */

export const zDailyViews = z.array(zDailyViewSchema);

export const zDailyViewsWrappedData = dataObject(zDailyViews);

export const zDailyViewsWithCategory = zDailyViewsWrappedData.merge(
  zRepresentativeCategorySchema,
);

export const zGetDailyViewsV2Res = zSuccessBase.merge(zDailyViewsWithCategory);

export type DailyViewModel = z.TypeOf<typeof zDailyViews>;

/**
 * getWeeklyKeywordListWithPagingV1 Zod
 */

export const zWeeklyKeywordsListSourceSchema =
  zCreateWeeklyKeywordsListSourceSchema;

export const zWeeklyKeywordsList = z.array(
  zCreateWeeklyKeywordsListSourceSchema,
);

export const zWeeklyKeywordsListData = dataObject(zWeeklyKeywordsList);

export const zWeeklyKeywordsListWithTotal = zTotalData.merge(
  zWeeklyKeywordsListData,
);
export const zGetWeeklyKeywordListWithPagingV1Res = dataObject(
  zWeeklyKeywordsListWithTotal,
);

export const SortOrderQuery = Object.keys(
  zCreateWeeklyKeywordsListSourceSchema.shape,
);

export const zSortWeeklyViews = zSortQuery(SortOrderQuery);

export type WeeklyHitsModel = z.TypeOf<typeof zWeeklyKeywordsListSourceSchema>;

/**
 * getWeeklyKeywordListWithPagingV2 Zod
 */

export const zWeeklyKeywordsWrappedData = dataObject(zWeeklyKeywordSchema);

export const zWeeklyKeywordsDataWithPagination =
  zWeeklyKeywordsPaginationSchema.merge(zWeeklyKeywordsWrappedData);

export const zGetWeeklyKeywordListWithPagingV2Res = z.object({
  body: zWeeklyKeywordsDataWithPagination,
});

/**
 * getWeeklyKeywordListWithPagingV1 getWeeklyKeywordListWithPagingV2 Shared
 */

export const zGetWeeklyViewsQuery = zPaginatedOffsetQuery
  .merge(zDateQuery.pick({ from: true }))
  .merge(zSortWeeklyViews)
  .merge(zCategoryNumberMulti);

/**
 * getWeeklyKeywordSome Zod
 * @reponse 응답 값은 getWeeklyKeywordListWithPagingV1와 동일
 */

export const zWeeklyHitsPathQuery = zKeywordsMulti.merge(zCategoryNumberMulti);
export const zGetWeeklyViewsBySomeQuery = zDateQuery
  .pick({ from: true })
  .merge(zPaginatedOffsetQuery)
  .merge(zSortWeeklyViews)
  .merge(zWeeklyHitsPathQuery);

/**
 * getExpectedViews Zod
 */

export const zExpectedViewsArr = z.array(zExpectedViewsData);

export const zExpectedViews = z.object({
  data: zExpectedViewsArr,
});

export type TExpectedViewsRes = z.TypeOf<typeof zExpectedViews>;

export type TExpectedViewsArr = z.TypeOf<typeof zExpectedViewsArr>;

/**
 * getAnalysisHitsV2 Zod
 */

export const zClusterSpecificCombinedSchema = z.object({
  clusterNumber: z.number().nullable(),
  data: z.array(zCombinedViewsSchema),
});

export const zClusterSpecificCombinedData = dataObject(
  zClusterSpecificCombinedSchema,
);

export type TAnalysisViewsRes = z.TypeOf<typeof zClusterSpecificCombinedData>;

/**
 * getProbabilitySuccess Zod
 */

export const zGetProbabilitySuccessRes = dataObject(zSuccessRateSchema);

/**
 * getKeywordThisWeekly Zod
 */

export const zKeywordThisWeeklyList = z.array(zKeywordSchema);
export const zVideoLengthRange = z.object({
  key: z.string(),
  from: z.number().nullable(),
  to: z.number().nullable(),
  docCount: z.number(),
  totalVideoViews: z.number(),
  averagePerformance: z.number().nullable(), // Nullable average performance
});
export const zKeywordThisWeeklyRes = dataObject(zKeywordThisWeeklyList);
export const zAnalysedVideoLengthRes = dataObject(zVideoLengthRange);
export type TKeywordThisWeeklyList = z.TypeOf<typeof zKeywordThisWeeklyList>;
export type TKeywordThisWeeklyRes = z.TypeOf<typeof zKeywordThisWeeklyRes>;
