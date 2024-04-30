import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import {
  IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort,
  TGetVideoViewsMatchingSearchOnSpecificDateRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';

import { Err, Ok } from 'oxide.ts';

import {
  CacheDoesNotFoundException,
  TableNotFoundException,
} from '@Libs/commons/src/exceptions/exceptions';

import { GetVideoViewsMatchingSearchOnSpecificDateDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import {
  DateFormatter,
  IgniteResultToObjectMapper,
} from '@Apps/common/ignite/mapper';

export class VideoLastHistoryAdapter
  extends VideoBaseAdapter
  implements IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort
{
  /**
   * 이 메소드는 특정 날짜에 대한 검색어와 일치하는 비디오 조회수를 반환합니다.
   * 관련 클러스터, 검색어, 관련 검색어, 시작 및 종료 날짜를 기반으로 가장 최근의 비디오 히스토리 정보를 조회합니다.
   * 결과는 주어진 칼럼 목록에 따라 변환되며, 캐시 또는 테이블을 찾을 수 없는 경우 적절한 예외를 반환합니다.
   *
   * @param dao GetVideoViewsMatchingSearchOnSpecificDateDao 인스턴스로, 비디오 조회수 조회에 필요한 매개변수를 포함합니다.
   * @returns TGetVideoViewsMatchingSearchOnSpecificDateRes<T> 프로미스로, 조회 성공 시 비디오 조회수 데이터를, 실패 시 에러를 반환합니다.
   *
   */
  async execute<T>(
    dao: GetVideoViewsMatchingSearchOnSpecificDateDao,
  ): Promise<TGetVideoViewsMatchingSearchOnSpecificDateRes<T>> {
    const {
      search,
      relatedCluster,
      related,
      from,
      to,
      columns = ['VH.VIDEO_ID', 'VH.VIDEO_VIEWS', 'VD.CHANNEL_ID', 'VH.DAY'],
    } = dao;

    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const { year, month, day } = DateUtil.currentDate();

    try {
      let queries = [];

      const tableName = CacheNameMapper.getVideoHistoryCacheName(
        relatedCluster[0],
        year,
        month,
      );
      const cache = await this.client.getCache(tableName);
      for (const cluster of relatedCluster) {
        const tableName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          year,
          month,
        );
        const joinTableName = CacheNameMapper.getVideoDataCacheName(cluster);
        const query = `(SELECT DISTINCT ${columns.join(', ')} 
                              FROM ${tableName} VH 
                              JOIN ${joinTableName} VD ON VH.VIDEO_ID = VD.VIDEO_ID 
                              WHERE (VD.VIDEO_TITLE LIKE '%${search}%' or VD.VIDEO_TAGS LIKE '%${search}%') 
                              AND (VD.VIDEO_TITLE LIKE '%${related}%' or VD.VIDEO_TAGS LIKE '%${related}%') 
                              AND VH.DAY = (SELECT MAX(VH2.DAY)
                                            FROM ${tableName} VH2
                                            WHERE VH2.VIDEO_ID = VH.VIDEO_ID
                                            AND (VH2.DAY BETWEEN ${
                                              fromDate.day
                                            } AND ${toDate.day}))
                              )`;
        queries.push(query);
      }

      const queryString = queries.join(' UNION ');
      const query = this.createDistributedJoinQuery(queryString);

      const result = await cache.query(query);

      const resArr = await result.getAll();

      if (!resArr.length) return Err(new VideoNotFoundError());

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
