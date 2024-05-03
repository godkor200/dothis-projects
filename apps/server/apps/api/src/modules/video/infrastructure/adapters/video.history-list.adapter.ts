import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import {
  IGetRelatedVideoAndVideoHistoryOutBoundPort,
  TRelatedVideoAndHistoryRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';

/**
 * 해당하는 비디오의 히스토리를 list up 해서 불러옵니다.
 * 이 메소드는 특정 클러스터 번호들, 검색어, 관련 검색어, 날짜 범위를 기반으로 정보를 검색합니다.
 * 날짜 범위가 같은 달 내에 있을 때와 다른 달에 걸쳐 있을 때의 로직을 다르게 처리합니다.
 */
export class VideoHistoryListAdapter
  extends VideoBaseAdapter
  implements IGetRelatedVideoAndVideoHistoryOutBoundPort
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
    const tableName = CacheNameMapper.getVideoHistoryCacheName(
      clusterNumbers[0],
      fromDate.year.toString(),
      fromDate.month.toString(),
    );
    let relatedCondition = '';
    if (related) {
      relatedCondition = `AND (
        vd.video_title LIKE '%${related}%'
        OR vd.video_tags LIKE '%${related}%'
      )`;
    }
    const queryString = clusterNumbers.map((cluster) => {
      const tableName = CacheNameMapper.getVideoHistoryCacheName(
        cluster,
        fromDate.year.toString(),
        fromDate.month.toString(),
      );

      const joinTableName = CacheNameMapper.getVideoDataCacheName(cluster);
      if (fromDate.month < toDate.month) {
        //월이 넘어갈경우
        const SecTableName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          toDate.year.toString(),
          toDate.month.toString(),
        );
        return `SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, vh.YEAR, vh.MONTH, vh.DAY
       FROM ${tableName} vh 
       JOIN ${joinTableName} vd 
       ON vd.video_id = vh.video_id
       WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
       ${relatedCondition}
       AND (vh.DAY >= ${fromDate.day}) 
       UNION 
       SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, vh.YEAR, vh.MONTH, vh.DAY
       FROM ${SecTableName} vh 
       JOIN ${joinTableName} vd 
       ON vd.video_id = vh.video_id
       WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
       ${relatedCondition}
       AND (vh.DAY <= ${toDate.day})`;
      } else {
        //아닌경우
        return `SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, vh.YEAR, vh.MONTH, vh.DAY
       FROM ${tableName} vh 
       JOIN ${joinTableName} vd 
       ON vd.video_id = vh.video_id
       WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
       ${relatedCondition}
       AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
      }
    });
    return queryString.length > 1
      ? queryString.join(' UNION ')
      : queryString[0];
  }

  async execute(
    dao: SearchRelationVideoAndHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes> {
    const { search, related, from, to, relatedCluster } = dao;

    try {
      const fromDate = DateFormatter.getFormattedDate(from);
      const tableName = CacheNameMapper.getVideoHistoryCacheName(
        relatedCluster[0],
        fromDate.year.toString(),
        fromDate.month.toString(),
      );
      const queryRes = this.queryString(
        relatedCluster,
        search,
        from,
        to,
        related,
      );

      const cache = await this.client.getCache(tableName);
      const query = this.createDistributedJoinQuery(queryRes);

      const result = await cache.query(query);
      const resArr = await result.getAll();

      if (!resArr.length) return Err(new VideoHistoryNotFoundError());

      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(resArr, queryRes),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
