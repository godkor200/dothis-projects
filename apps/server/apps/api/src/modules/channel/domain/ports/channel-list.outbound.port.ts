import { TChannelSearchResult } from '@Apps/modules/channel/infrastucture/adapters';
import { ChannelListDao } from '@Apps/modules/channel/infrastucture/daos/get-channel-list.dao';

export interface ChannelListOutboundPort {
  execute(dao: ChannelListDao): Promise<TChannelSearchResult>;
}
