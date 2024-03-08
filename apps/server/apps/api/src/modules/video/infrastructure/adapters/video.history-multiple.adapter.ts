import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { IGetRelatedLastVideoHistory } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetRelatedLastVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { TGetRelatedLastVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/adapters/video.last-history.adapter';
import { Err, Ok } from 'oxide.ts';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';

export class VideoHistoryMultipleAdapter
  extends VideoBaseAdapter
  implements IGetRelatedLastVideoHistory
{
  async execute(
    dao: GetRelatedLastVideoAndVideoHistory,
  ): Promise<TGetRelatedLastVideoAndVideoHistory> {
    const { search, relatedCluster, relatedWords } = dao;
    /**
     * 클러스터도 0,1로 한정
     */
    const tempCluster = [0, 1];
    let queryString = '';
    /**
     * 현재는 최신데이터가 1월로 한정되어 있어서 1월로 한정
     */
    tempCluster.forEach((cluster, index) => {
      let wordQuery = relatedWords
        .map(
          (word) =>
            `(VD.video_title LIKE '%${word}%' OR VD.video_tags LIKE '%${word}%')`,
        )
        .join(' OR ');

      const subQuery = `
        (SELECT VH.VIDEO_ID, VH.VIDEO_VIEWS, VH.DAY , VD.video_title, VD.video_tags
        FROM DOTHIS.VIDEO_HISTORY_CLUSTER_${cluster}_2024_1 VH 
        JOIN DOTHIS.VIDEO_DATA_CLUSTER_${cluster} VD ON VH.VIDEO_ID = VD.VIDEO_ID 
        WHERE (VD.video_title LIKE '%${search}%' or VD.video_tags LIKE '%${search}%') 
        AND (${wordQuery})
        AND VH.DAY = (
            SELECT MAX(VH2.DAY) 
            FROM DOTHIS.VIDEO_HISTORY_CLUSTER_${cluster}_2024_1 VH2 
            WHERE VH2.VIDEO_ID = VH.VIDEO_ID
        ))
      `;

      queryString += index === 0 ? subQuery : ' UNION ' + subQuery;
    });
    try {
      const query = new this.SqlFieldsQuery(queryString);

      const cache = await this.client.getCache(
        'DOTHIS.VIDEO_HISTORY_CLUSTER_0_2024_1',
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
