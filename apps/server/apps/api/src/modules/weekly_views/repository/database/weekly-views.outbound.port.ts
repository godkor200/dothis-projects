import { GetWeeklyViewsQuery } from '@Apps/modules/weekly_views/dtos/get-weekly-views-list.dto';

export interface WeeklyViewsOutboundPort {
  getPaginatedWeeklyViewsByKeyword(arg: GetWeeklyViewsQuery): Promise<any>;
}
