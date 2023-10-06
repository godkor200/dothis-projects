import { DailyViewsEntity } from '../repository/entity/daily-views.entity';

export interface FindDailyViewsAdapter {
  findDailyView: (
    options: string[],
    from: Date,
    to: Date,
  ) => Promise<DailyViewsEntity[]>;
}
