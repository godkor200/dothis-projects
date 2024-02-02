import { DailyViewsEntity } from '@Apps/modules/daily-view/domain/repository/entity/daily-views.entity';

export interface FindDailyViewsAdapterPort {
  findDailyView: (
    options: string[],
    from: Date,
    to: Date,
  ) => Promise<DailyViewsEntity[]>;
}
