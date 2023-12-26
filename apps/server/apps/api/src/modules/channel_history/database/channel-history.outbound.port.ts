import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { FindVideoV2 } from '@Apps/modules/video/interface/find-accumulate-videos.interface';

export interface ChannelHistoryOutboundPort {
  findChannelHistoryInfo(channelIds: string): Promise<IChannelHistoryRes>;

  findChannelHistoryByLimit(
    channelIds: string[],
    size: number,
    order: 'desc' | 'asc',
  ): Promise<IChannelHistoryRes[]>;

  findChannelHistoryByKeywordAndRelWordFullScan<T>(
    props: FindVideoV2,
  ): Promise<T[]>;
}
