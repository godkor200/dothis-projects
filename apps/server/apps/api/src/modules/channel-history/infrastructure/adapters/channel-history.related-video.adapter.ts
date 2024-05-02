import { ChannelHistoryBaseAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.base.adapter';
import {
  FindChannelHistoryRelatedVideoDao,
  TGetRelatedVideoRes,
} from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';

import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { IGetChannelHistoryRelateVideoOutboundPort } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
/**
 * 탐색어, 연관어에 관한 비디오의 비디오히스토리와 함께 가져오는 날짜에 한하여 가져오는 어뎁터
 * 이 메소드는 특정 클러스터 번호들, 검색어, 관련 검색어, 날짜 범위를 기반으로 정보를 검색합니다.
 * 날짜 범위가 같은 달 내에 있을 때와 다른 달에 걸쳐 있을 때의 로직을 다르게 처리합니다.
 * 이건 채널히스토리랑 관계없지 않을까?
 * @param dao
 */
export class ChannelHistoryRelatedVideoAdapter
  extends ChannelHistoryBaseAdapter
  implements IGetChannelHistoryRelateVideoOutboundPort
{
  private queryString(
    clusterNumbers: string[],
    search: string,
    from: string,
    to: string,
    related?: string,
  ): string {
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    let relatedCondition = '';
    if (related) {
      relatedCondition = `AND (
        vd.video_title LIKE '%${related}%'
        OR vd.video_tags LIKE '%${related}%'
      )`;
    }
    const queries = clusterNumbers.map((cluster) => {
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
                ${relatedCondition}
                AND (vh1.DAY >= ${toDate.day} AND vh2.DAY <= ${fromDate.day})
                `;
      }
      return `SELECT DISTINCT vd.video_id, vd.channel_id
      FROM ${tableName} vd
      JOIN ${joinTableName} vh ON vd.video_id = vh.video_id
      WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
      ${relatedCondition}
      AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
    });
    return queries.length > 1 ? queries.join(' UNION ') : queries[0];
  }

  async execute(
    dao: FindChannelHistoryRelatedVideoDao,
  ): Promise<TGetRelatedVideoRes> {
    const { search, related, from, to, relatedCluster } = dao;

    const tableName = CacheNameMapper.getVideoDataCacheName(relatedCluster[0]);

    try {
      const queryString = this.queryString(
        relatedCluster,
        search,
        from,
        to,
        related,
      );
      const query = this.createDistributedJoinQuery(queryString);
      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();

      if (!resArr.length) return Err(new ChannelHistoryNotFoundError());

      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
