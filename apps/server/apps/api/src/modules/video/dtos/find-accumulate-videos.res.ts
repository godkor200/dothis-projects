import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';

export interface FindAccumulateVideosRes
  extends Pick<IChannelHistoryRes, 'channel_id' | 'channel_subscribers'> {}
