import { ChannelHistoryBaseAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.base.adapter';
import { IGetChannelHistoryEntireListAdapterOutboundPort } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';
import { FindIndividualVideoInfoV1Dao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  ChannelHistoryLatestDayTupleRes,
  TChannelHistoryTuplesRes,
} from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { CacheNameMapper } from '@Apps/common/ignite/mapper';

export class ChannelHistoryEntireListAdapter
  extends ChannelHistoryBaseAdapter
  implements IGetChannelHistoryEntireListAdapterOutboundPort
{
  async execute(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryTuplesRes> {
    const { clusterNumber, videoId } = dao;
    const { year, month } = DateUtil.currentDate();
    const tableName = CacheNameMapper.getChannelHistoryCacheName(year, month);
    const joinTableName = CacheNameMapper.getVideoDataCacheName(
      clusterNumber[0],
    );
    const queryString = `SELECT ch.${this.keys.join(
      ', ch.',
    )}, vd.video_tags FROM ${tableName} ch JOIN ${joinTableName} vd ON ch.channel_id = vd.channel_id WHERE vd.video_id = '${videoId}'`;
    return await this.get<ChannelHistoryLatestDayTupleRes>(
      tableName,
      queryString,
    );
  }
}
