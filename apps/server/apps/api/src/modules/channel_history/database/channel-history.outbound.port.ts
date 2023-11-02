import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { OsRes } from '@Apps/common/aws/interface/os.res.interface';

export interface ChannelHistoryOutboundPort {
  findChannelHistoryFullscan(
    channelIds: string[],
  ): Promise<IChannelHistoryRes[]>;
}
