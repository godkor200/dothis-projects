import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { FindAccumulateVideoV2 } from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';

export interface ChannelHistoryOutboundPort {
  findChannelHistoryFullScan<T>(
    channelIds: string[],
    data?: CHANNEL_DATA_KEY[],
  ): Promise<T[]>;

  findChannelHistoryByLimit(
    channelIds: string[],
    size: number,
    order: 'desc' | 'asc',
  ): Promise<IChannelHistoryRes[]>;

  findChannelHistoryByKeywordAndRelWordFullScan<T>(
    props: FindAccumulateVideoV2,
  ): Promise<T[]>;
}
