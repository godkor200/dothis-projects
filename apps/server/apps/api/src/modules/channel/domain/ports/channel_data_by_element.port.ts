import { ChannelDataByElementDao } from '@Apps/modules/channel/infrastucture/daos/channel_data_by_element.dao';
import { ChannelAdapterOutboundResult } from '@Apps/modules/channel/domain/ports/channel.adapter.port';

export interface ChannelDataByElementPort {
  execute(dao: ChannelDataByElementDao): Promise<ChannelAdapterOutboundResult>;
}
