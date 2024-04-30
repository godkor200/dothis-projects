import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { IGetRelatedLastVideoHistory } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetRelatedLastVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';

import { Err, Ok, Result } from 'oxide.ts';

import {
  CacheDoesNotFoundException,
  TableNotFoundException,
} from '@Libs/commons/src/exceptions/exceptions';

import { IRelatedVideoAnalyticsData } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
export type TGetRelatedVideoAnalyticsData = Result<
  IRelatedVideoAnalyticsData[],
  | VideoHistoryNotFoundError
  | TableNotFoundException
  | CacheDoesNotFoundException
>;
export class VideoHistoryMultipleAdapter
  extends VideoBaseAdapter
  implements IGetRelatedLastVideoHistory
{
  async execute(
    dao: GetRelatedLastVideoAndVideoHistory,
  ): Promise<TGetRelatedVideoAnalyticsData> {
    const { search, relatedCluster, relatedWords } = dao;
    let { day, month, year } = DateUtil.currentDate();
    let queryString = '';
    relatedCluster.forEach((cluster, index) => {
      let wordQuery = relatedWords
        .map(
          (word) =>
            `(VD.video_title LIKE '%${word}%' OR VD.video_tags LIKE '%${word}%')`,
        )
        .join(' OR ');
      const tableName = CacheNameMapper.getVideoHistoryCacheName(
        cluster,
        year,
        month,
      );
      const joinTableName = CacheNameMapper.getVideoDataCacheName(cluster);
      const joinThirdTableName = CacheNameMapper.getChannelHistoryCacheName(
        year,
        month,
      );

      const subQuery = `
        (
        SELECT VH.VIDEO_ID, VH.VIDEO_VIEWS, VH.DAY, VD.video_title, CH.CHANNEL_AVERAGE_VIEWS, VD.channel_id, VD.video_tags, to_char(VD.video_published, 'YYYY-MM-DD') AS video_published
        FROM ${tableName} VH 
        JOIN ${joinTableName} VD ON VH.VIDEO_ID = VD.VIDEO_ID
        JOIN ${joinThirdTableName} CH ON CH.CHANNEL_ID = VD.channel_id 
        WHERE (VD.video_title LIKE '%${search}%' or VD.video_tags LIKE '%${search}%') 
        AND (${wordQuery})
        AND VH.DAY = (SELECT MAX(day) FROM ${tableName})
        AND VH.VIDEO_VIEWS > 1000
        AND CH.DAY = (SELECT MAX(day) FROM ${joinThirdTableName})
        AND VD.video_published >= DATEADD(month, -6, CURRENT_TIMESTAMP)
        )
      `;

      queryString += index === 0 ? subQuery : ' UNION ' + subQuery;
    });
    try {
      const query = this.createDistributedJoinQuery(queryString);

      const cache = await this.client.getCache(
        CacheNameMapper.getVideoHistoryCacheName(
          relatedCluster[0],
          year,
          month,
        ),
      );
      const result = await cache.query(query);
      const resArr = await result.getAll();

      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(resArr, queryString),
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
