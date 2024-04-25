import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { IGetRelatedLastVideoHistory } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetRelatedLastVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';

import { Err, Ok, Result } from 'oxide.ts';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import {
  CacheDoesNotFoundException,
  TableNotFoundException,
} from '@Libs/commons/src/exceptions/exceptions';

import { IRelatedVideoAnalyticsData } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
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
        SELECT VH.VIDEO_ID, VH.VIDEO_VIEWS, VH.DAY, VD.video_title, CH.CHANNEL_AVERAGE_VIEWS, VD.channel_id, VD.video_tags
        FROM ${tableName} VH 
        JOIN ${joinTableName} VD ON VH.VIDEO_ID = VD.VIDEO_ID
        JOIN ${joinThirdTableName} CH ON CH.CHANNEL_ID = VD.channel_id 
        WHERE (VD.video_title LIKE '%${search}%' or VD.video_tags LIKE '%${search}%') 
        AND (${wordQuery})
        AND VH.DAY = (SELECT MAX(day) FROM ${tableName})
        AND CH.DAY = (SELECT MAX(day) FROM ${joinThirdTableName})
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

/**
 * (SELECT VH.VIDEO_ID, VH.VIDEO_VIEWS, VH.DAY, VD.video_title, CH.CHANNEL_AVERAGE_VIEWS, VD.channel_id, VD.video_tags
 *    FROM dothis.video_history_08_202404 VH
 *    JOIN dothis.video_data_08 VD ON VH.VIDEO_ID = VD.VIDEO_ID
 *    JOIN dothis.channel_history_202404 CH ON CH.CHANNEL_ID = VD.channel_id
 *    WHERE (VD.video_title LIKE '%서울%' or VD.video_tags LIKE '%서울%')
 *    AND ((VD.video_title LIKE '%충청%' OR VD.video_tags LIKE '%충청%') OR (VD.video_title LIKE '%강원%' OR VD.video_tags LIKE '%강원%') OR (VD.video_title LIKE '%기스크%' OR VD.video_tags LIKE '%기스크%') OR (VD.video_title LIKE '%경주%' OR VD.video_tags LIKE '%경주%') OR (VD.video_title LIKE '%성동갑%' OR VD.video_tags LIKE '%성동갑%') OR (VD.video_title LIKE '%동북권%' OR VD.video_tags LIKE '%동북권%') OR (VD.video_title LIKE '%빠따보소%' OR VD.video_tags LIKE '%빠따보소%') OR (VD.video_title LIKE '%정송갤러리%' OR VD.video_tags LIKE '%정송갤러리%') OR (VD.video_title LIKE '%기수%' OR VD.video_tags LIKE '%기수%') OR (VD.video_title LIKE '%수도권%' OR VD.video_tags LIKE '%수도권%') OR (VD.video_title LIKE '%대설주의보%' OR VD.video_tags LIKE '%대설주의보%') OR (VD.video_title LIKE '%경마방송%' OR VD.video_tags LIKE '%경마방송%') OR (VD.video_title LIKE '%레이스%' OR VD.video_tags LIKE '%레이스%') OR (VD.video_title LIKE '%인천%' OR VD.video_tags LIKE '%인천%') OR (VD.video_title LIKE '%직캠%' OR VD.video_tags LIKE '%직캠%') OR (VD.video_title LIKE '%방송%' OR VD.video_tags LIKE '%방송%') OR (VD.video_title LIKE '%과천%' OR VD.video_tags LIKE '%과천%') OR (VD.video_title LIKE '%미세먼지 비상저감조치%' OR VD.video_tags LIKE '%미세먼지 비상저감조치%') OR (VD.video_title LIKE '%부산%' OR VD.video_tags LIKE '%부산%') OR (VD.video_title LIKE '%광주%' OR VD.video_tags LIKE '%광주%') OR (VD.video_title LIKE '%해맞이%' OR VD.video_tags LIKE '%해맞이%') OR (VD.video_title LIKE '%대구%' OR VD.video_tags LIKE '%대구%') OR (VD.video_title LIKE '%경주마%' OR VD.video_tags LIKE '%경주마%'))
 *    AND VH.DAY = 25
 *    AND (
 *          (CH.DAY = 25)
 *          OR
 *          (CH.DAY = 24 AND NOT EXISTS (SELECT 1 FROM dothis.channel_history_202404 WHERE DAY = 25))
 *        )
 *    )
 */
