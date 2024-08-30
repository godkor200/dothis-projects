import { Result } from 'oxide.ts';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { TableNotFoundException } from '@Libs/commons';
import { FindAccumulateVideosV1Dto } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';

export interface ChannelHistoryLatestDayTupleRes {
  channelId: string;
  channelAverageViews: number;
  channelSubscribers: number;
  channelTotalViews: number;
  channelTotalVideos: number;
  videoPublished: string;
  videoTags: string;
  year: number;
  month: number;
  day: number;
}
export interface IGetRelatedVideoRes
  extends Pick<ChannelHistoryLatestDayTupleRes, 'channelId'> {
  videoId: string;
}

export type TGetRelatedVideoRes = Result<
  IGetRelatedVideoRes[],
  ChannelHistoryNotFoundError | TableNotFoundException
>;
export type TChannelHistoryTuplesRes = Result<
  ChannelHistoryLatestDayTupleRes[],
  ChannelHistoryNotFoundError | TableNotFoundException
>;
export class FindChannelHistoryRelatedVideoDao extends FindAccumulateVideosV1Dto {
  public readonly relatedCluster: string[];
  constructor(props: FindAccumulateVideosV1Dto) {
    super(props);
    const propsClusterNumber = !Array.isArray(props.clusterNumber)
      ? [props.clusterNumber]
      : props.clusterNumber;
    this.search = props.search;
    this.related = props.related;
    this.from = props.from;
    this.to = props.to;
    this.relatedCluster = propsClusterNumber;
  }
}
