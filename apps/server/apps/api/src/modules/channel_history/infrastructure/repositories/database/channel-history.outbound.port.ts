import { IChannelHistoryRes } from '@Apps/modules/channel_history/application/dtos/expected-views.res';
import {
  TChannelHistoryLatestDayTupleRes,
  TChannelHistoryTuplesRes,
} from '@Apps/modules/channel_history/infrastructure/daos/channel-history.dao';
import { FindIndividualVideoInfoV1Dao } from '@Apps/modules/video/infrastructure/daos/video.dao';

export interface ChannelHistoryOutboundPort {
  findChannelHistoryByLimit(
    channelIds: string[],
    size: number,
    order: 'desc' | 'asc',
  ): Promise<IChannelHistoryRes[]>;

  getLatestDayTuple(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryLatestDayTupleRes>;

  getHistory(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryTuplesRes>;

  scanLatestChannelHistoryByKeywordAndRelWord<T>(dao: any): Promise<any>;

  findChannelHistoryByKeywordAndRelWordFullScan<T>(dao: any): Promise<any>;
}
