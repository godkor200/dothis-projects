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

/**
 * 연관어에 관련된 관련어를 가지고 있는 비디오를 찾아 옵니다.
 * 연관어는 하나인 반면 관련어는 다수입니다
 * 조건:
 *  - 비디오 조회수 1천회 이상
 *  - video_published 6개월내 이상
 */
export class VideoHistoryMultipleAdapter
  extends VideoBaseAdapter
  implements IGetRelatedLastVideoHistory
{
  private queryString(
    clusterNumbers: string[],
    search: string,
    related: string[],
  ): string {
    let { month, year } = DateUtil.currentDate();
    let queryString = '';
    clusterNumbers.forEach((cluster, index) => {
      let wordQuery = related
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

      const query = `
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

      queryString += index === 0 ? query : ' UNION ' + query;
    });
    return queryString;
  }
  async execute(
    dao: GetRelatedLastVideoAndVideoHistory,
  ): Promise<TGetRelatedVideoAnalyticsData> {
    let { month, year } = DateUtil.currentDate();
    const { search, relatedCluster, relatedWords } = dao;
    const queryString = this.queryString(relatedCluster, search, relatedWords);
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
