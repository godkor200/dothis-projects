import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import {
  IGetRelatedLastVideoHistoryEach,
  IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort,
  TGetVideoViewsMatchingSearchOnSpecificDateRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';

import { Err, Ok, Result } from 'oxide.ts';

import {
  DateFormatter,
  VideosResultTransformer,
} from '@Apps/modules/video/infrastructure/utils';
import {
  CacheDoesNotFoundException,
  TableNotFoundException,
} from '@Libs/commons/src/exceptions/exceptions';

import { GetVideoViewsMatchingSearchOnSpecificDateDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export class VideoLastHistoryAdapter
  extends VideoBaseAdapter
  implements IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort
{
  /**
   * 서브쿼리를 이용한 제일 최근 히스토리만 불러오기
   * @param dao
   */
  async execute(
    dao: GetVideoViewsMatchingSearchOnSpecificDateDao,
  ): Promise<TGetVideoViewsMatchingSearchOnSpecificDateRes> {
    const { search, relatedCluster, related, from, to } = dao;
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    /**
     * 현재 데이터가 완전하게 들어가있지 않아 클러스터를 1월로 제한한다.
     *
     **/

    try {
      let queries = [];

      const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${0}_${currentYear}_${1}`;
      const cache = await this.client.getCache(tableName);
      for (const cluster of relatedCluster) {
        const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${cluster}_${currentYear}_${1}`;

        const query = `(SELECT DISTINCT VH.VIDEO_ID, VH.VIDEO_VIEWS, VD.CHANNEL_ID ,VH.DAY 
                              FROM ${tableName} VH 
                              JOIN DOTHIS.VIDEO_DATA_CLUSTER_${cluster} VD ON VH.VIDEO_ID = VD.VIDEO_ID 
                              WHERE (VD.VIDEO_TITLE LIKE '%${search}%' or VD.VIDEO_TAGS LIKE '%${search}%') 
                              AND (VD.VIDEO_TITLE LIKE '%${related}%' or VD.VIDEO_TAGS LIKE '%${related}%') 
                              AND VH.DAY = (SELECT MAX(VH2.DAY)
                                            FROM ${tableName} VH2
                                            WHERE VH2.VIDEO_ID = VH.VIDEO_ID
                                            AND (VH2.DAY BETWEEN ${fromDate.day} AND ${toDate.day}))
                              )`;
        queries.push(query);
      }

      const queryString = queries.join(' UNION ');
      const query = this.createDistributedJoinQuery(queryString);

      const result = await cache.query(query);

      const resArr = await result.getAll();

      if (!resArr.length) return Err(new VideoNotFoundError());

      return Ok(
        VideosResultTransformer.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      if (e.message.includes('Cache')) {
        return Err(new CacheDoesNotFoundException(e.message));
      }

      return Err(e);
    }
  }
}
