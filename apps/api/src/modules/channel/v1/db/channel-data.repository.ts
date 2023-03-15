import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { Channel } from '@Apps/config/database/domain/entities/channel/channel.entity';
import { ChannelModel, zChannelData } from '@dothis/dto';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelDataRepositoryPost } from '@Apps/modules/channel/v1/db/channel-data.repository.post';
import { C_channelEntity } from '@Apps/config/database/domain/entities/c_channel/c_channel.entity';

export class ChannelDataRepository
  extends SqlRepositoryBase<C_channelEntity, ChannelModel>
  implements ChannelDataRepositoryPost
{
  @InjectRepository(C_channelEntity)
  protected repository: Repository<C_channelEntity>;
  protected tableName = 'C_Channel';
  protected schema: ZodObject<any> = zChannelData;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findOneByChannelId(channelId: string): Promise<C_channelEntity> {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .where({ channelId })
      .getOne();
  }
}
