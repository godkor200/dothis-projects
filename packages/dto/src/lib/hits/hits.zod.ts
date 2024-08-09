import {
  zCategoryNumberMulti,
  zDateQuery,
  zKeywordsMulti,
  zPaginatedOffsetQuery,
} from '../common.model';
import { zSortWeeklyViews } from './hits.model';
import { z } from 'zod';

const zWeeklyViewKeywordCategoryQuery = z.object({
  keywords: z.string().optional(),
  categoryNumbers: z.number().optional(),
});

export const zGetWeeklyViewsQuery = zPaginatedOffsetQuery
  .merge(zDateQuery.pick({ from: true }))
  .merge(zSortWeeklyViews)
  .merge(zWeeklyViewKeywordCategoryQuery);

export const zWeeklyHitsPathQuery = zKeywordsMulti.merge(zCategoryNumberMulti);
export const zGetWeeklyViewsBySomeQuery = zDateQuery
  .pick({ from: true })
  .merge(zPaginatedOffsetQuery)
  .merge(zSortWeeklyViews)
  .merge(zWeeklyHitsPathQuery);

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
