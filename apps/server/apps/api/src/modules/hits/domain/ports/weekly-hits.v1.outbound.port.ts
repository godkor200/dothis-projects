import { RepositoryPort } from '@Libs/commons/src';
import { WeeklyHitsEntity } from '@Apps/modules/hits/domain/entities/weekly-hits.entity';
import { GetSomeWeeklyViewsDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { Result } from 'oxide.ts';

export type TFilteredWeeklyHitsRes = Result<
  WeeklyHitsEntity[],
  WeeklyViewsError
>;

export interface WeeklyHitsV1OutboundPort
  extends RepositoryPort<WeeklyHitsEntity> {
  filterWeeklyKeywordHits(
    dao: GetSomeWeeklyViewsDao,
  ): Promise<TFilteredWeeklyHitsRes>;
}
