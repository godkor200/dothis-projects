import { GetWeeklyViewsDaoV2 } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Paginated, RepositoryPort } from '@Libs/commons/src';
import { WeeklyHitsEntity } from '@Apps/modules/hits/domain/entities/weekly-hits.entity';
import { Result } from 'oxide.ts';

import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
export type TPaginatedWeeklyHitsV2Res = Result<
  Paginated<WeeklyHitsEntity>,
  WeeklyViewsError
>;
export interface WeeklyHitsV2OutboundPort
  extends RepositoryPort<WeeklyHitsEntity> {
  getPaginatedWeeklyHitsByKeywordAndCount(
    dao: GetWeeklyViewsDaoV2,
  ): Promise<TPaginatedWeeklyHitsV2Res>;
}
