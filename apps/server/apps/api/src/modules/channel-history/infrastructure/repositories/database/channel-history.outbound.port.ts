import { IChannelHistoryRes } from '@Apps/modules/channel-history/application/dtos/expected-views.res';
import {
  FindChannelHistoryRelatedVideoDao,
  FindChannelInfoDao,
  TChannelHistoryTuplesRes,
  TGetRelatedVideoRes,
} from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';
import { FindIndividualVideoInfoV1Dao } from '@Apps/modules/video/infrastructure/daos/video.dao';

export interface ChannelHistoryOutboundPort {
  findChannelHistoryInfo(dao: FindChannelInfoDao): Promise<any>;

  findChannelHistoryByLimit(
    channelIds: string[],
    size: number,
    order: 'desc' | 'asc',
  ): Promise<IChannelHistoryRes[]>;

  getHistory(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryTuplesRes>;
}
export interface IGetChannelHistoryLatestTuple {
  execute(dao: FindIndividualVideoInfoV1Dao): Promise<TChannelHistoryTuplesRes>;
}
export interface IGetChannelHistoryRelateVideoOutboundPort {
  execute(dao: FindChannelHistoryRelatedVideoDao): Promise<TGetRelatedVideoRes>;
}
