import { IfindManyVideoResult } from 'apps/api/src/modules/video/interface/find-many-video.interface';
import { DailyViewsEntity } from '../repository/entity/daily-views.entity';

export interface FindDailyViewsAdapter {
  findDailyView: (
    options: string[],
    from: Date,
    to: Date,
  ) => Promise<DailyViewsEntity[]>;
}
