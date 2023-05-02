import { RepositoryPort } from '@Libs/commons/src';
import { DailyViewsEntity } from '../entity/daily-views.entity';

export interface DailyViewsRepositoryPort
  extends RepositoryPort<DailyViewsEntity> {
  findDailyView(
    videoIdx: string[],
    from: string,
    to: string,
  ): Promise<DailyViewsEntity[]>;
}
