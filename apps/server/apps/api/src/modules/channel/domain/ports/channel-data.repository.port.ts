import { ChannelEntity } from '@Apps/modules/channel/infrastucture/entities/channel.entity';
import { RepositoryPort } from '@Libs/commons';

export interface ChannelDataRepositoryPort
  extends RepositoryPort<ChannelEntity> {
  findOneByChannelId(channelId: string): Promise<ChannelEntity>;
}
