import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { OsRes } from '@Apps/common/aws/interface/os.res.interface';

export interface ChannelHistoryOutboundPort {
  findChannelHistory(
    channelIds: string[],
  ): Promise<OsRes<IChannelHistoryRes>[]>;
}
