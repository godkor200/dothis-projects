import { GetWeeklyViewsDto } from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { TGetWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';
import { GetWeeklyHitsListDto } from '@Apps/modules/hits/application/dtos/get-some-weekly-hits.dto';

export interface WeeklyHitsV2InboundPort {
  execute(dto: GetWeeklyHitsListDto): Promise<TGetWeeklyHitsRes>;
}
