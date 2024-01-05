import { RepositoryPort } from '@Libs/commons/src';
import { ChannelEntity } from '../repository/entity/channel.entity';
export interface ChannelRepositoryPort extends RepositoryPort<ChannelEntity> {
  findOneByChannelId(channelId: string): Promise<ChannelEntity>;
}
