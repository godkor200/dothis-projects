import { ChannelHistoryBaseAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.base.adapter';
import {
  FindChannelHistoryRelatedVideoDao,
  TGetRelatedVideoRes,
} from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';

import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { IGetChannelHistoryRelateVideoOutboundPort } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';

export class ChannelHistoryRelatedVideoAdapter
  extends ChannelHistoryBaseAdapter
  implements IGetChannelHistoryRelateVideoOutboundPort
{
  /**
   *
   * @param dao
   */
  async execute(
    dao: FindChannelHistoryRelatedVideoDao,
  ): Promise<TGetRelatedVideoRes> {
    const { search, related, from, to, relatedCluster } = dao;
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const tableName = `DOTHIS.VIDEO_DATA_CLUSTER_${relatedCluster[0]}`;
    const queries = relatedCluster.map((cluster) => {
      const tableName = `DOTHIS.VIDEO_DATA_CLUSTER_${cluster}`;
      const joinTableName = `VIDEO_HISTORY_CLUSTER_${cluster}_${fromDate.year}_${fromDate.month}`;
      return `SELECT DISTINCT vd.video_id, vd.channel_id
      FROM ${tableName} vd
      JOIN ${joinTableName} vh ON vd.video_id = vh.video_id
      WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
      AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%')
      AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
    });
    try {
      const queryString = queries.join(' UNION ');
      const query = this.createDistributedJoinQuery(queryString);
      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new ChannelHistoryNotFoundError());

      return Ok(
        VideosResultTransformer.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
