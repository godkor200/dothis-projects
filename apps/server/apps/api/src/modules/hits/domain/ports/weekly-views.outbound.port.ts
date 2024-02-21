import { GetWeeklyViewsDto } from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { WeeklyKeywordsRes } from '@Libs/commons/src/interfaces/types/res.types';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';

export interface WeeklyViewsOutboundPort {
  getPaginatedWeeklyViewsByKeyword(
    arg: GetWeeklyViewsDto,
  ): Promise<WeeklyKeywordsRes | WeeklyViewsError>;
}
