import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { FindVideoV2 } from '@Apps/modules/video/application/dtos/find-accumulate-videos.interface';
import { FindVideoChannelHistory } from '@Apps/modules/channel_history/dtos/channel-history.interface';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';

export interface ChannelHistoryOutboundPort {
  findChannelHistoryInfo(channelIds: string): Promise<IChannelHistoryRes>;

  findChannelHistoryByLimit(
    channelIds: string[],
    size: number,
    order: 'desc' | 'asc',
  ): Promise<IChannelHistoryRes[]>;

  findChannelHistoryByKeywordAndRelWordFullScan<T>(
    props: FindVideoV2,
  ): Promise<T[] | ScrollApiError>;

  scanLatestChannelHistoryByKeywordAndRelWord<T>(
    props: FindVideoChannelHistory,
  ): Promise<T[] | ScrollApiError>;
}
