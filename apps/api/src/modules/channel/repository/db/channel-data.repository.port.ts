import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { ChannelEntity } from '../entity/channel.entity';

export interface ChannelDataRepositoryPort
  extends RepositoryPort<ChannelEntity> {
  findOneByChannelId(channelId: string): Promise<ChannelEntity>;
}
