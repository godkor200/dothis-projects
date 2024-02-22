import { zDateQuery, zPaginatedOffsetQuery } from '../common.model';
import { zSortWeeklyViews } from './hits.model';

export const zGetWeeklyViewsQuery = zPaginatedOffsetQuery
  .omit({ offset: true })
  .merge(zDateQuery.pick({ from: true }))
  .merge(zSortWeeklyViews);
