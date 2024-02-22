import { GetWeeklyViewsDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { WeeklyKeywordsListSchema } from '@Libs/commons/src/interfaces/types/res.types';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { Result } from 'oxide.ts';
export type TPaginatedWeeklyHitsRes = Result<
  WeeklyKeywordsListSchema[],
  WeeklyViewsError
>;
export type TGetWeeklyHitsCount = Result<number, WeeklyViewsError>;
export interface WeeklyHitsOutboundPort {
  getPaginatedWeeklyHitsByKeyword(
    dao: GetWeeklyViewsDao,
  ): Promise<TPaginatedWeeklyHitsRes>;

  getWeeklyHitsCount(dao: GetWeeklyViewsDao): Promise<TGetWeeklyHitsCount>;
}
