import { DailyViewsEntity } from '@Apps/modules/hits/domain/entities/daily-views.entity';

export interface FindDailyViewsAdapterPort {
  findDailyView: (
    options: string[],
    from: Date,
    to: Date,
  ) => Promise<DailyViewsEntity[]>;
}
