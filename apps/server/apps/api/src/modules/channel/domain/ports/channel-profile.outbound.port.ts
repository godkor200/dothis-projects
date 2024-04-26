import {
  ChannelProfileDao,
  TChannelProfileRes,
} from '@Apps/modules/channel/infrastucture/daos/channel.dao';

export interface InfluentialChannelProfileOutboundPort {
  execute(dao: ChannelProfileDao): Promise<TChannelProfileRes>;
}
