import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { ChannelEntity } from '@Apps/config/database/domain/entities/channel/channel.entity';

export interface ChannelDataRepositoryPort
  extends RepositoryPort<ChannelEntity> {
  findOneByChannelId(channelId: string): Promise<ChannelEntity>;
}
