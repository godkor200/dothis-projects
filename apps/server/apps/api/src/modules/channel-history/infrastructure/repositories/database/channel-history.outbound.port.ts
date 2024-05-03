import {
  FindChannelHistoryRelatedVideoDao,
  TChannelHistoryTuplesRes,
  TGetRelatedVideoRes,
} from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';
import { FindIndividualVideoInfoV1Dao } from '@Apps/modules/video/infrastructure/daos/video.dao';

export interface ChannelHistoryOutboundPort {
  getHistory(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryTuplesRes>;
}
export interface IGetChannelHistoryLatestTupleByVideoAdapter {
  execute(dao: FindIndividualVideoInfoV1Dao): Promise<TChannelHistoryTuplesRes>;
}
export interface IGetChannelHistoryRelateVideoOutboundPort {
  execute(dao: FindChannelHistoryRelatedVideoDao): Promise<TGetRelatedVideoRes>;
}
