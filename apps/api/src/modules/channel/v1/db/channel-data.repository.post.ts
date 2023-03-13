import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { Channel } from '@Apps/config/database/domain/entities/channel/channel.entity';
export interface ChannelDataRepositoryPost extends RepositoryPort<Channel> {
  findOneByChannelId(channelId: string): Promise<Channel>;
}
