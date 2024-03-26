import {
  IGetVideoAndChannelViewsByDateAndKeywordsOutboundPort,
  TGetVideoAndChannelViewsByDateAndKeywordsRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { GetVideoAndChannelViewsByDateAndKeywordsDao } from '@Apps/modules/video/infrastructure/daos/video.dao';

import { Err, Ok } from 'oxide.ts';
import {
  DateFormatter,
  VideosResultTransformer,
} from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

/**
 * 두번 조인 쿼리는 어떻게 하든 느림.... 그러나 스플릿이 완성되면 다를수도 있음
 */
export class VideoChannelAverageViewsAdapter
  extends VideoBaseAdapter
  implements IGetVideoAndChannelViewsByDateAndKeywordsOutboundPort
{
  async execute(
    dao: GetVideoAndChannelViewsByDateAndKeywordsDao,
  ): Promise<TGetVideoAndChannelViewsByDateAndKeywordsRes> {
    const { search, related, relatedCluster, from, to } = dao;

    try {
      const fromDate = DateFormatter.getFormattedDate(from);
      const toDate = DateFormatter.getFormattedDate(to);
      const relatedClusterIndex = relatedCluster[0];
      const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${relatedClusterIndex}_${fromDate.year}_${fromDate.month}`;
      const channelIdTableName = `DOTHIS.CHANNEL_HISTORY`;

      const queries = relatedCluster.map((cluster) => {
        const joinTableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${cluster}_${fromDate.year}_${fromDate.month}`;
        const tableName = `DOTHIS.VIDEO_DATA_CLUSTER_${cluster}`;
        const dayToCheck = toDate.day;

        return `SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, ch.channel_id, ch.channel_average_views
        FROM ${tableName} vd
        JOIN (SELECT VIDEO_ID, VIDEO_VIEWS, DAY 
              FROM ${joinTableName} 
              WHERE (day) = (
              CASE 
                  WHEN EXISTS (SELECT 1 FROM ${joinTableName} WHERE day = ${dayToCheck})
                  THEN (${dayToCheck})
                  ELSE (${dayToCheck} - 1)
              END
                            )
             ) vh ON vd.video_id = vh.video_id
        JOIN ( 
          SELECT channel_id, channel_average_views
          FROM ${channelIdTableName}
          WHERE (year, month, day) = (
              CASE 
                  WHEN EXISTS (SELECT 1 FROM ${channelIdTableName} WHERE year = ${toDate.year} AND month = ${toDate.month} AND day = ${dayToCheck})
                  THEN (${toDate.year}, ${toDate.month}, ${dayToCheck})
                  ELSE (${toDate.year}, ${toDate.month}, ${dayToCheck} - 1)
              END
                                      )
              ) ch ON ch.channel_id = vd.channel_id
        WHERE (vd.video_title LIKE '%${search}%' OR vd.video_tags LIKE '%${search}%')
        AND (vd.video_title LIKE '%${related}%' OR vd.video_tags LIKE '%${related}%')
        AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
      });

      const queryString = queries.join(' UNION ');
      const query = this.createDistributedJoinQuery(queryString);
      const cache = await this.client.getCache(tableName);
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
      return Err(e);
    }
  }
}
