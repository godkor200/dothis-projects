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
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';

export class ChannelHistoryRelatedVideoAdapter
  extends ChannelHistoryBaseAdapter
  implements IGetChannelHistoryRelateVideoOutboundPort
{
  /**
   * 탐색어, 연관어에 관한 비디오의 비디오히스토리와 함께 가져오는 날짜에 한하여 가져오는 어뎁터
   * FIXME: Date, from to 가 달을 넘어갈 경우 조인을 하나 더 해야되!(적용됨)
   * 이건 채널히스토리랑 관계없지 않을까?
   * @param dao
   */
  async execute(
    dao: FindChannelHistoryRelatedVideoDao,
  ): Promise<TGetRelatedVideoRes> {
    const { search, related, from, to, relatedCluster } = dao;
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const tableName = CacheNameMapper.getVideoDataCacheName(relatedCluster[0]);
    const queries = relatedCluster.map((cluster) => {
      const tableName = CacheNameMapper.getVideoDataCacheName(cluster);
      const joinTableName = CacheNameMapper.getVideoHistoryCacheName(
        cluster,
        fromDate.year.toString(),
        fromDate.month.toString(),
      );
      if (fromDate.month < toDate.month) {
        const joinSecCacheName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          toDate.year.toString(),
          toDate.month.toString(),
        );
        return `SELECT DISTINCT vd.video_id, vd.channel_id
                FROM ${tableName} vd
                JOIN ${joinTableName} vh1 ON vd.video_id = vh1.video_id
                JOIN ${joinSecCacheName} vh2 ON vd.video_id = vh2.video_id
                WHERE (vd.video_title LIKE '%${search}%' OR vd.video_tags LIKE '%${search}%')
                AND (vd.video_title LIKE '%${related}%' OR vd.video_tags LIKE '%${related}%')
                AND (vh1.DAY >= ${toDate.day} AND vh2.DAY <= ${fromDate.day})
                `;
      }
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
      console.log(query);
      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();

      if (!resArr.length) return Err(new ChannelHistoryNotFoundError());

      return Ok(
        VideosResultTransformer.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      console.log(e);
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
