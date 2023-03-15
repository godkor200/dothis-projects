import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { C_channelEntity } from '@Apps/config/database/domain/entities/c_channel/c_channel.entity';

export interface ChannelDataRepositoryPost
  extends RepositoryPort<C_channelEntity> {
  findOneByChannelId(channelId: string): Promise<C_channelEntity>;
}
