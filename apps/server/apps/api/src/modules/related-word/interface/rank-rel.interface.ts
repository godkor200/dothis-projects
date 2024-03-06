import {
  IChannelHistoryInnerHits,
  ISource,
  VideoSource,
} from '@Apps/modules/video/application/dtos/find-accumulate-videos.interface';
import { HitList, OsRes } from '@Apps/common/aws/interface/os.res.interface';
import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video_history/domain/ports/video-history.outbound.port';

interface ISourceWithoutChannelSubscribers
  extends Pick<ISource, 'channel_average_views'> {}

export interface IChannelHistoryWithoutChannelSubscribers
  extends OsRes<
    ISourceWithoutChannelSubscribers,
    IChannelHistoryInnerHits<HitList<VideoSource>>
  > {}

export interface IRankingRelWords {
  data: GetRelatedVideoAndVideoHistory[];
  relatedWord: string;
}
