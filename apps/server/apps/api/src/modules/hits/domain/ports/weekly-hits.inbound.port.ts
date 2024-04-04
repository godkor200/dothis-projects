import { GetWeeklyViewsDto } from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { TGetWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';
import { GetSomeWeeklyHitsDto } from '@Apps/modules/hits/application/dtos/get-some-weekly-hits.dto';
import { TGetSomeWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-some-weekly-hits.v1.query-handler';

export interface WeeklyHitsInboundPort {
  getPagination(dto: GetWeeklyViewsDto): Promise<TGetWeeklyHitsRes>;
}

export interface WeeklyHitsSomeInboundPort {
  execute(dto: GetSomeWeeklyHitsDto): Promise<TGetSomeWeeklyHitsRes>;
}
