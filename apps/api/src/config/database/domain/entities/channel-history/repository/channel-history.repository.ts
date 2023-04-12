import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { ChannelHistoryEntity } from '../db/channel-history.entity';
import { ChannelHistoryModel } from '@dothis/dto';
import { Repository } from 'typeorm';
import { ZodObject } from 'zod';

export class ChannelHistoryRepository extends SqlRepositoryBase<
  ChannelHistoryEntity,
  ChannelHistoryModel
> {
  protected tableName: string;
  protected schema: ZodObject<any>;
  protected repository: Repository<ChannelHistoryEntity>;
}
