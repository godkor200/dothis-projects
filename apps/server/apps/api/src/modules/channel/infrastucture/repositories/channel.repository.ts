import { Injectable } from '@nestjs/common';
import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { ChannelEntity } from '@Apps/modules/channel/infrastucture/entities/channel.entity';
import { ChannelModel as TChannelModel, zChannelData } from '@dothis/dto';
import { ChannelRepositoryPort } from '@Apps/modules/channel/domain/ports/channel.repository.port';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChannelRepository
  extends SqlRepositoryBase<ChannelEntity, TChannelModel>
  implements ChannelRepositoryPort
{
  @InjectRepository(ChannelEntity)
  protected readonly repository: Repository<ChannelEntity>;
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected schema = zChannelData;
  protected tableName: string = 'Channel';

  async findOneByChannelId(channelId: string): Promise<ChannelEntity> {
    return await this.repository.findOneBy({ channelId });
  }
}
