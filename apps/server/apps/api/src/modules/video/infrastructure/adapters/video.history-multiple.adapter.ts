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
  /**
   * 현재는 최신데이터가 1월로 한정되어 있어서 1월로 한정
   * 클러스터도 0,1로 한정
   */
  async execute(
    dao: GetRelatedLastVideoAndVideoHistory,
  ): Promise<TGetRelatedVideoAnalyticsData> {
    const { search, relatedCluster, relatedWords } = dao;
    const tempCluster = [0, 1];
    let queryString = '';
    tempCluster.forEach((cluster, index) => {
      let wordQuery = relatedWords
        .map(
          (word) =>
            `(VD.video_title LIKE '%${word}%' OR VD.video_tags LIKE '%${word}%')`,
        )
        .join(' OR ');

      const subQuery = `
        (SELECT VH.VIDEO_ID, VH.VIDEO_VIEWS, VH.DAY, VD.video_title, CH.CHANNEL_AVERAGE_VIEWS, VD.channel_id, VD.video_tags
        FROM DOTHIS.VIDEO_HISTORY_CLUSTER_${cluster}_2024_1 VH 
        JOIN DOTHIS.VIDEO_DATA_CLUSTER_${cluster} VD ON VH.VIDEO_ID = VD.VIDEO_ID
        JOIN DOTHIS.CHANNEL_HISTORY CH ON CH.CHANNEL_ID = VD.channel_id 
        WHERE (VD.video_title LIKE '%${search}%' or VD.video_tags LIKE '%${search}%') 
        AND (${wordQuery})
        AND VH.DAY = 31
        AND (
    (CH.YEAR = 2024 AND CH.MONTH = 2 AND CH.DAY = 26)
    OR 
    (CH.YEAR = 2024 AND CH.MONTH = 2 AND CH.DAY = 25 AND NOT EXISTS (SELECT 1 FROM DOTHIS.CHANNEL_HISTORY WHERE YEAR = 2024 AND MONTH = 2 AND DAY = 26))
            )
        ) 
      `;

      queryString += index === 0 ? subQuery : ' UNION ' + subQuery;
    });
    try {
      const query = this.createDistributedJoinQuery(queryString);

      const cache = await this.client.getCache(
        `DOTHIS.VIDEO_HISTORY_CLUSTER_${tempCluster[0]}_2024_1`,
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
      return Err(e);
    }
  }
}
