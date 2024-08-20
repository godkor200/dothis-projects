import { RepositoryPort } from '@Libs/commons';
import { ChannelEntity } from '@Apps/modules/channel/infrastucture/entities/channel.entity';
export interface ChannelRepositoryPort extends RepositoryPort<ChannelEntity> {
  findOneByChannelId(channelId: string): Promise<ChannelEntity>;
}
