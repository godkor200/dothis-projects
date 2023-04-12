import { DailyViewsEntity } from '../entity/daily-views.entity';
import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { DailyViewsRepositoryPort } from './daily-views.repository.port';
import { DataSource, Repository } from 'typeorm';
import { DailyViewModel, zDailyViews } from '@dothis/dto';
import { ZodObject } from 'zod';

export class DailyViewsRepository
  extends SqlRepositoryBase<DailyViewsEntity, DailyViewModel>
  implements DailyViewsRepositoryPort
{
  protected repository: Repository<DailyViewsEntity>;

  protected tableName = 'daily_views';

  protected schema: ZodObject<any> = zDailyViews;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
}
