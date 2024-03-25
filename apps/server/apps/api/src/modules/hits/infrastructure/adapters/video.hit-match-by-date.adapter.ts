import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import {
  IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort,
  TGetVideoViewsMatchingSearchOnSpecificDateRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoViewsMatchingSearchOnSpecificDateDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';

import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export class VideoHitMatchByDateAdapter
  extends VideoBaseAdapter
  implements IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort
{
  async execute(
    dao: GetVideoViewsMatchingSearchOnSpecificDateDao,
  ): Promise<TGetVideoViewsMatchingSearchOnSpecificDateRes> {
    const { search, related, relatedCluster, from, to } = dao;

    try {
      const fromDate = DateFormatter.getFormattedDate(from);
      const toDate = DateFormatter.getFormattedDate(to);

      const queryString = relatedCluster.map((cluster) => {
        const tableName = `DOTHIS.VIDEO_DATA_CLUSTER_${cluster}`;
        const joinTableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${cluster}_${fromDate.year}_${fromDate.month}`;

        return `(SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, MAX(vh.DAY)
                FROM ${tableName} vd
                JOIN ${joinTableName} vh ON vd.video_id = vh.video_id
                WHERE (vd.video_title LIKE '%${search}%' OR vd.video_tags LIKE '%${search}%')
                AND (vd.video_title LIKE '%${related}%' OR vd.video_tags LIKE '%${related}%')
                AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})
                GROUP BY vh.VIDEO_ID,vh.VIDEO_VIEWS)`;
      });

      const combinedQueryString: string =
        relatedCluster.length === 1
          ? // 하나의 클러스터만 있는 경우, 배열에서 첫 번째 쿼리 문자열을 사용합니다.
            queryString[0]
          : // 여러 클러스터가 있는 경우, 모든 쿼리 문자열을 'UNION'로 결합합니다.
            queryString.join(' UNION ');
      const tableName = `DOTHIS.VIDEO_DATA_CLUSTER_${relatedCluster[0]}`;
      const query = this.createDistributedJoinQuery(combinedQueryString);
      const cache = await this.client.getCache(tableName);
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
