import { RepositoryPort } from '@Libs/commons/src';
import { DailyViewsEntity } from '../entity/daily-views.entity';

export interface DailyViewsRepositoryPort
  extends RepositoryPort<DailyViewsEntity> {}
