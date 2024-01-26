import { GetWeeklyViewsDto } from '@Apps/modules/weekly_views/dtos/get-weekly-views-list.dto';
import { WeeklyKeywordsRes } from '@Libs/commons/src/interfaces/types/res.types';
import { WeeklyViewsError } from '@Apps/modules/weekly_views/domain/event/weekly-views.error';

export interface WeeklyViewsOutboundPort {
  getPaginatedWeeklyViewsByKeyword(
    arg: GetWeeklyViewsDto,
  ): Promise<WeeklyKeywordsRes | WeeklyViewsError>;
}
