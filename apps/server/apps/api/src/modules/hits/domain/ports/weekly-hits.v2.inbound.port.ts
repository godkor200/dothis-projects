import { GetWeeklyViewsDto } from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { TGetWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';

export interface WeeklyHitsV2InboundPort {
  execute(dto: GetWeeklyViewsDto): Promise<TGetWeeklyHitsRes>;
}
