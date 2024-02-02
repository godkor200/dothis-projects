import { DailyViewsEntity } from '@Apps/modules/hits/domain/repository/entity/daily-views.entity';

export interface FindDailyViewsAdapterPort {
  findDailyView: (
    options: string[],
    from: Date,
    to: Date,
  ) => Promise<DailyViewsEntity[]>;
}
