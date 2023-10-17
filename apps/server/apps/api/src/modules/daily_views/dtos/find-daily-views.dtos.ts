import { FindDailyViewsQuery } from '@Apps/modules/daily_views/interface/find-daily-views.dto';

export interface FindDailyViewsDtos
  extends Omit<FindDailyViewsQuery, 'clusterNumber'> {}
