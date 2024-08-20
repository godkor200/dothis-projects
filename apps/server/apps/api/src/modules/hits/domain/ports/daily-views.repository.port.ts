import { RepositoryPort } from '@Libs/commons';
import { DailyViewsEntity } from '@Apps/modules/hits/domain/entities/daily-views.entity';

export interface DailyViewsRepositoryPort
  extends RepositoryPort<DailyViewsEntity> {
  findDailyView(
    videoIdx: string[],
    from: string,
    to: string,
  ): Promise<DailyViewsEntity[]>;
}
