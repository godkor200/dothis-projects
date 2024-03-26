import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import {
  IGetVideoAdsTopHitsAdapterOutboundPort,
  TFindAdsTopHitsRepoRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoAdsTopHitsDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';

import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';

export class VideoAdsTopHitsAdapter
  extends VideoBaseAdapter
  implements IGetVideoAdsTopHitsAdapterOutboundPort
{
  private queryString(
    clusterNumber: string,
    search: string,
    related: string,
    from: string,
    to: string,
    limit: string,
  ) {
    return `(SELECT
  vd.VIDEO_TITLE,
  vd.VIDEO_PUBLISHED,
  cd.CHANNEL_NAME,
  MAX(vh.VIDEO_VIEWS) AS VIDEO_VIEWS
FROM
  DOTHIS.VIDEO_DATA_CLUSTER_${clusterNumber} vd
JOIN
 DOTHIS.CHANNEL_DATA cd
ON
 vd.CHANNEL_ID = cd.CHANNEL_ID
JOIN
  DOTHIS.VIDEO_HISTORY_CLUSTER_${clusterNumber}_2024_1 vh 
ON
  vd.VIDEO_ID = vh.VIDEO_ID
WHERE
  (vd.VIDEO_TITLE LIKE '%${search}%' OR vd.VIDEO_TAGS LIKE '%${search}%')
  AND (vd.VIDEO_TITLE LIKE '%${related}%' OR vd.VIDEO_TAGS LIKE '%${related}%')
  AND vh.DAY BETWEEN ${from} AND ${to}
  AND vd.VIDEO_WITH_ADS = TRUE 
GROUP BY vd.VIDEO_ID
ORDER BY VIDEO_VIEWS DESC 
LIMIT ${limit})`;
  }
  async execute(dao: GetVideoAdsTopHitsDao): Promise<TFindAdsTopHitsRepoRes> {
    const { search, related, from, to, relatedCluster, limit } = dao;
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const queryString: string[] = relatedCluster.map((cluster) =>
      this.queryString(
        cluster,
        search,
        related,
        fromDate.day.toString(),
        toDate.day.toString(),
        limit,
      ),
    );
    const combinedQueryString: string =
      relatedCluster.length === 1
        ? // 하나의 클러스터만 있는 경우, 배열에서 첫 번째 쿼리 문자열을 사용합니다.
          queryString[0]
        : // 여러 클러스터가 있는 경우, 모든 쿼리 문자열을 'UNION'로 결합합니다.
          queryString.join(' UNION ');

    const tableName = `DOTHIS.VIDEO_DATA_CLUSTER_${relatedCluster[0]}`;
    try {
      const cache = await this.client.getCache(tableName);
      const query = this.createDistributedJoinQuery(combinedQueryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoNotFoundError());
      return Ok(
        VideosResultTransformer.mapResultToObjects(resArr, combinedQueryString),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
