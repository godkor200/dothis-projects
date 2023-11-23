import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { IVideoHistorySource } from '@Apps/modules/video/interface/find-accumulate-videos.interface';

export interface FindAccumulateVideosRes
  extends Pick<IChannelHistoryRes, 'channel_id' | 'channel_subscribers'> {}

export interface FindAccumulateVideosV2Res extends IVideoHistorySource {}
