import { SqlRepositoryBase } from '@Libs/commons';
import { ChannelAnalysisEntity } from '@Apps/modules/channel/infrastucture/entities/channel-analysis.entity';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';
import { TChannelAnalysisModel, zChannelAnalysisEntity } from '@dothis/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelAnalysisRepositoryPort } from '@Apps/modules/channel/infrastucture/repositories/channel-analysis.repository.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelAnalysisRepository
  extends SqlRepositoryBase<ChannelAnalysisEntity, TChannelAnalysisModel>
  implements ChannelAnalysisRepositoryPort
{
  protected tableName: string = 'channel_analysis';
  protected schema: ZodObject<any> = zChannelAnalysisEntity;

  @InjectRepository(ChannelAnalysisEntity)
  protected repository: Repository<ChannelAnalysisEntity>;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
  async findByUserId(userId: number): Promise<ChannelAnalysisEntity[]> {
    return await this.repository.find({ where: { userId } });
  }

  async checkChannel(
    userId: number,
    channelId: string,
  ): Promise<ChannelAnalysisEntity[]> {
    return await this.repository.find({
      where: { userId, registeredChannelId: channelId },
    });
  }
}
