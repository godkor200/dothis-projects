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

/**
 * 채널과 채널히스토리의 제일 최근 데이터만 가져오는 어뎁터
 */
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
      const queries = `SELECT cd.channel_name, cd.channel_link, ch.channel_subscribers, ch.channel_total_videos, ch.channel_average_views, cd.mainly_used_keywords
                                     FROM ${tableName} cd 
                                     JOIN ${joinTableName} ch
                                     ON cd.channel_id = ch.channel_id
                                     WHERE cd.channel_id = '${channelId}'
                                     AND ch.DAY = (SELECT MAX(DAY) FROM ${joinTableName})`;

      const query = this.createDistributedJoinQuery(queries);
      const cache = await this.client.getCache(tableName);
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
