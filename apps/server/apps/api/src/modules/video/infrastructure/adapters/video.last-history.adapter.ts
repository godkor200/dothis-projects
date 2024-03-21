import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { IGetRelatedLastVideoHistoryEach } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetRelatedLastVideoAndVideoHistoryEach } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import {
  CacheDoesNotFoundException,
  TableNotFoundException,
} from '@Libs/commons/src/exceptions/exceptions';
import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
export type TGetRelatedLastVideoAndVideoHistory = Result<
  GetRelatedVideoAndVideoHistory[],
  | VideoHistoryNotFoundError
  | TableNotFoundException
  | CacheDoesNotFoundException
>;

export class VideoLastHistoryAdapter
  extends VideoBaseAdapter
  implements IGetRelatedLastVideoHistoryEach
{
  /**
   * 서브쿼리를 이용한 제일 최근 히스토리만 불러오기
   * @param dao
   */
  async execute(
    dao: GetRelatedLastVideoAndVideoHistoryEach,
  ): Promise<TGetRelatedLastVideoAndVideoHistory> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const { search, relatedCluster, relatedWord } = dao;
    /**
     * 현재 데이터가 완전하게 들어가있지 않아 클러스터를 1월로 제한한다.
     *
     **/

    try {
      // 각 클러스터에 대한 쿼리를 저장할 배열을 초기화합니다.
      let queries = [];

      // 모든 클러스터에 대해 반복합니다.
      /**
       * 현재 데이터가 완전하게 들어가있지 않아 클러스터를 2개, 1월로 제한한다.
       * example [0,1]
       */
      const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${0}_${currentYear}_${1}`;
      const cache = await this.client.getCache(tableName);
      for (const cluster of [0, 1]) {
        // 테이블 이름을 생성합니다.
        // 쿼리를 생성합니다.
        const query = `SELECT VH.VIDEO_ID, VH.VIDEO_VIEWS, VH.DAY 
                              FROM ${tableName} VH 
                              JOIN DOTHIS.VIDEO_DATA_CLUSTER_${cluster} VD ON VH.VIDEO_ID = VD.VIDEO_ID 
                              WHERE (VD.VIDEO_TITLE LIKE '%${search}%' or VD.VIDEO_TAGS LIKE '%${search}%') 
                              AND (VD.VIDEO_TITLE LIKE '%${relatedWord}%' or VD.VIDEO_TAGS LIKE '%${relatedWord}%') 
                              AND VH.DAY = (SELECT MAX(VH2.DAY) FROM ${tableName} VH2 WHERE VH2.VIDEO_ID = VH.VIDEO_ID)`;
        queries.push(query);
      }

      const queryString = queries.join(' UNION ');
      const query = this.createDistributedJoinQuery(queryString);

      const result = await cache.query(query);

      const resArr = await result.getAll();

      if (!resArr.length) return Err(new VideoHistoryNotFoundError());

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
