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

      const subQuery = `
        (SELECT VH.VIDEO_ID, VH.VIDEO_VIEWS, VH.DAY, VD.video_title, CH.CHANNEL_AVERAGE_VIEWS, VD.channel_id, VD.video_tags
        FROM ${CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          year,
          month,
        )} VH 
        JOIN ${CacheNameMapper.getVideoDataCacheName(
          cluster,
        )} VD ON VH.VIDEO_ID = VD.VIDEO_ID
        JOIN ${CacheNameMapper.getChannelHistoryCacheName(
          year,
          month,
        )} CH ON CH.CHANNEL_ID = VD.channel_id 
        WHERE (VD.video_title LIKE '%${search}%' or VD.video_tags LIKE '%${search}%') 
        AND (${wordQuery})
        AND VH.DAY = ${day}
        AND (
              (CH.DAY = ${day})
              OR 
              (CH.DAY = ${(
                Number(day) - 1
              ).toString()} AND NOT EXISTS (SELECT 1 FROM ${CacheNameMapper.getChannelHistoryCacheName(
        year,
        month,
      )} WHERE DAY = ${day}))
            )
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
