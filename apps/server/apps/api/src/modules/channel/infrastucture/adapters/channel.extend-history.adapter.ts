import { ChannelAndExtendHistoryOutboundPort } from '@Apps/modules/channel/domain/ports/channel-profile.outbound.port';
import {
  AnalyzeChannelDao,
  TFindExtendChannelHistoryListRes,
} from '@Apps/modules/channel/infrastucture/daos/channel.dao';
import {
  CacheNameMapper,
  IgniteResultToObjectMapper,
} from '@Apps/common/ignite/mapper';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';

export class ChannelAndHistoryJoinAdapter
  extends VideoBaseAdapter
  implements ChannelAndExtendHistoryOutboundPort
{
  async execute(
    dao: AnalyzeChannelDao,
  ): Promise<TFindExtendChannelHistoryListRes> {
    const { channelId } = dao;
    const { year, month } = DateUtil.currentDate();
    const tableName = CacheNameMapper.getChannelDataCacheName();
    const joinTableName = CacheNameMapper.getChannelHistoryCacheName(
      year,
      month,
    );
    try {
      const queries = `SELECT * FROM ${tableName} cd 
                                     JOIN ${joinTableName} ch
                                     ON cd.channel_id = ch.channel_id
                                     WHERE cd.channel_id = '${channelId}'`;
      const cache = await this.client.getCache(queries);
      const query = this.createDistributedJoinQuery(queries);

      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());

      return Ok(IgniteResultToObjectMapper.mapResultToObjects(resArr, queries));
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
