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

export class VideoHistoryListAdapter
  extends VideoBaseAdapter
  implements IGetRelatedVideoAndVideoHistoryOutBoundPort
{
  async execute(
    dao: SearchRelationVideoAndHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes> {
    const { search, related, from, to, relatedCluster } = dao;

    try {
      const fromDate = DateFormatter.getFormattedDate(from);
      const toDate = DateFormatter.getFormattedDate(to);
      const tableName = CacheNameMapper.getVideoHistoryCacheName(
        relatedCluster[0],
        fromDate.year.toString(),
        fromDate.month.toString(),
      );
      const queryString = relatedCluster.map((cluster) => {
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
       AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%')
       AND (vh.DAY <= ${fromDate.day}) 
       UNION 
       SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, vh.YEAR, vh.MONTH, vh.DAY
       FROM ${SecTableName} vh 
       JOIN ${joinTableName} vd 
       ON vd.video_id = vh.video_id
       WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
       AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%')
       AND (vh.DAY >= ${toDate.day})`;
        } else {
          //아닌경우
          return `SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, vh.YEAR, vh.MONTH, vh.DAY
       FROM ${tableName} vh 
       JOIN ${joinTableName} vd 
       ON vd.video_id = vh.video_id
       WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
       AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%')
       AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
        }
      });
      const queryRes =
        queryString.length > 1 ? queryString.join(' UNION ') : queryString[0];

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
