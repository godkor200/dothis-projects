import {
  ChannelProfileDao,
  TChannelProfileRes,
} from '@Apps/modules/channel/infrastucture/daos/channel.dao';

export interface ChannelProfileOutboundPort {
  execute(dao: ChannelProfileDao): Promise<TChannelProfileRes>;
}
