import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { ChannelModel, zChannelData } from '@dothis/dto';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelDataRepositoryPort } from '@Apps/modules/channel/repository/db/channel-data.repository.port';
import { ChannelEntity } from '../entity/channel.entity';

export class ChannelDataRepository
  extends SqlRepositoryBase<ChannelEntity, ChannelModel>
  implements ChannelDataRepositoryPort
{
  @InjectRepository(ChannelEntity)
  protected repository: Repository<ChannelEntity>;
  protected tableName = 'Channel';
  protected schema: ZodObject<any> = zChannelData;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findOneByChannelId(channelId: string): Promise<ChannelEntity> {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .where({ channelId })
      .getOne();
  }
}
