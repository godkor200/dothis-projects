import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
import {
  IGetListVideoHistoryOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IGetListVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
/**
 * 비디오 히스토리 리스트 확장 어댑터 클래스.
 * VideoBaseAdapter를 상속받아 비디오 히스토리 정보를 조회하는 기능을 제공한다.
 */
export class ExtendedVideoHistoryListAdapter
  extends VideoBaseAdapter
  implements IGetListVideoHistoryOutboundPort
{
  /**
   * 비디오 히스토리 정보를 조회하여 반환하는 메소드. union으로 여러개의 캐시 테이블을 조회
   * @param {IGetListVideoHistoryDao} dao - 비디오 히스토리 조회에 필요한 파라미터 객체.
   * @returns {Promise<TGetVideoHistoryRes>} 조회 결과를 반환하는 프로미스 객체.
   */
  async execute(dao: IGetListVideoHistoryDao): Promise<TGetVideoHistoryRes> {
    const { from, to, clusterNumber, videoId } = dao;

    try {
      const fromDate = DateFormatter.getFormattedDate(from);
      const toDate = DateFormatter.getFormattedDate(to);

      const generateQueriesForMonths = (
        cluster: string,
        startYear: number,
        startMonth: number,
        endYear: number,
        endMonth: number,
      ) => {
        let queries = [];
        let currentYear = startYear;
        let currentMonth = startMonth;

        while (
          currentYear < endYear ||
          (currentYear === endYear && currentMonth <= endMonth)
        ) {
          const tableName = CacheNameMapper.getVideoHistoryCacheName(
            cluster,
            currentYear.toString(),
            currentMonth.toString(),
          );
          const joinTableName = CacheNameMapper.getVideoDataCacheName(cluster);

          let query = `SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, vh.YEAR, vh.MONTH, vh.DAY
                       FROM ${tableName} vh 
                       JOIN ${joinTableName} vd 
                       ON vd.video_id = vh.video_id
                       WHERE (vd.video_id = '${videoId}')`;
          queries.push(query);

          currentMonth++;
          if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
          }
        }

        return queries;
      };

      const queryString = generateQueriesForMonths(
        clusterNumber,
        fromDate.year,
        fromDate.month,
        toDate.year,
        toDate.month,
      );

      const queryRes =
        queryString.length > 1 ? queryString.join(' UNION ') : queryString[0];

      const cache = await this.client.getCache(queryString[0]); // Assuming first query table as cache name for simplicity
      const query = this.createDistributedJoinQuery(queryRes);

      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());

      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(resArr, queryRes),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
