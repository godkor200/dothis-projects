import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { ChannelEntity } from '@Apps/modules/channel/infrastucture/entities/channel.entity';

export interface ChannelDataRepositoryPort
  extends RepositoryPort<ChannelEntity> {
  findOneByChannelId(channelId: string): Promise<ChannelEntity>;
}
