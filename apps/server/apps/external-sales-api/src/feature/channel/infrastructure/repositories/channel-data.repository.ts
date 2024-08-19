import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { ChannelDataEntity } from '@ExternalApps/feature/video/domain/entities';
import { TChannelModel, zChannelDataSchema } from '@dothis/dto';
import { ChannelDataRepositoryPort } from '@ExternalApps/feature/channel/domain/port/channel-data.repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';

export class ChannelDataRepository
  extends SqlRepositoryBase<ChannelDataEntity, TChannelModel>
  implements ChannelDataRepositoryPort
{
  protected tableName = 'channel_data';

  protected schema: ZodObject<any> = zChannelDataSchema;

  @InjectRepository(ChannelDataEntity, 'onPromisesMysql')
  protected readonly repository: Repository<ChannelDataEntity>;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
}
