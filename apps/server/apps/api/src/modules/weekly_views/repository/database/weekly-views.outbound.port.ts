import { GetWeeklyViewsQuery } from '@Apps/modules/weekly_views/dtos/get-weekly-views-list.dto';
import { WeeklyKeywordsRes } from '@Libs/commons/src/types/res.types';
import { WeeklyViewsError } from '@Apps/modules/weekly_views/domain/event/weekly-views.error';

export interface WeeklyViewsOutboundPort {
  getPaginatedWeeklyViewsByKeyword(
    arg: GetWeeklyViewsQuery,
  ): Promise<WeeklyKeywordsRes | WeeklyViewsError>;
}
