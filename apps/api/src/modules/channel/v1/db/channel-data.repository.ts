import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { Channel } from '@Apps/config/database/domain/entities/channel/channel.entity';
import { ChannelModel, zChannelData } from '@dothis/dto';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelDataRepositoryPost } from '@Apps/modules/channel/v1/db/channel-data.repository.post';

export class ChannelDataRepository
  extends SqlRepositoryBase<Channel, ChannelModel>
  implements ChannelDataRepositoryPost
{
  @InjectRepository(Channel) protected repository: Repository<Channel>;
  protected tableName = 'Channel';
  protected schema: ZodObject<any> = zChannelData;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findOneByChannelId(channelId: string): Promise<Channel> {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .where({ channelId })
      .getOne();
  }
}
