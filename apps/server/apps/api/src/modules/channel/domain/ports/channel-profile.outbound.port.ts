import {
  AnalyzeChannelDao,
  ChannelProfileDao,
  TChannelProfileRes,
  TFindExtendChannelHistoryListRes,
} from '@Apps/modules/channel/infrastucture/daos/channel.dao';

export interface InfluentialChannelProfileOutboundPort {
  execute(dao: ChannelProfileDao): Promise<TChannelProfileRes>;
}
export interface ChannelAndExtendHistoryOutboundPort {
  execute(dao: AnalyzeChannelDao): Promise<TFindExtendChannelHistoryListRes>;
}
