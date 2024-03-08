import { HitList, OsRes } from '@Apps/common/aws/interface/os.res.interface';
import { CHANNEL_DATA_KEY } from '@Apps/modules/hits/application/dtos/expected-hits.dtos';
import { FindVideoChannelHistory } from '@Apps/modules/channel_history/application/dtos/channel-history.interface';
export interface VideoSource {
  video_title: string;
  video_views: number;
  crawled_date: string;
  video_tags: string;
  channel_id: string;
  video_id: string;
}

export interface IFindAccumulateVideoRes<T> {
  videoTotal: number;
  userSection: SECTION_NUMBER;
  section: T;
}

export interface IFindAccumulateVideoWithOutUserSection<T>
  extends Omit<IFindAccumulateVideoRes<T>, 'userSection'> {}

export interface ISection {
  section: SECTION_NUMBER;
  number: number;
}

export enum SECTION_NUMBER {
  RANGE_0_100 = '0~99',
  RANGE_100_1000 = '100~999',
  RANGE_1000_10000 = '1000~9999',
  RANGE_10000_50000 = '10000~49999',
  RANGE_50000_100000 = '50000~99999',
  RANGE_100000_500000 = '100000~499999',
  RANGE_500000_AND_ABOVE = '500000이상',
}

interface Video {
  video_tag: string;
  crawled_date: string;
  video_title: string;
  video_url: string;
  views: number;
}

export interface IVideoHistorySource {
  video_list: Video[];
  video_aver_views: number;
  channel_subscribers: number;
}

export interface IVideoHistory {
  _id: string;
  _source: IVideoHistorySource[];
}
export interface IChannelHistory
  extends OsRes<ISource, IChannelHistoryInnerHits<HitList<VideoSource>>> {}

export interface IChannelHistoryInnerHits<T> {
  video_list: T;
}

export interface ISource {
  channel_subscribers: number;
  channel_average_views: number;
}

export interface FindVideoV2 extends FindVideoChannelHistory {
  readonly data?: CHANNEL_DATA_KEY[];
}
