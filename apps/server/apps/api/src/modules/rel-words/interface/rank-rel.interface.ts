import {
  IChannelHistoryInnerHits,
  ISource,
  VideoSource,
} from '@Apps/modules/video/interfaces/find-accumulate-videos.interface';
import { HitList, OsRes } from '@Apps/common/aws/interface/os.res.interface';

interface ISourceWithoutChannelSubscribers
  extends Pick<ISource, 'channel_average_views'> {}

export interface IChannelHistoryWithoutChannelSubscribers
  extends OsRes<
    ISourceWithoutChannelSubscribers,
    IChannelHistoryInnerHits<HitList<VideoSource>>
  > {}

export interface IRankingRelWords {
  data: IChannelHistoryWithoutChannelSubscribers[];
  relWord: string;
}
