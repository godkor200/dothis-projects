import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { GetVideoDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  IGetRelatedVideosEntireCountOutBoundPort,
  TRelatedEntireCount,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';

/**
 * 이 메소드는 비디오 데이터를 조회하여 총갯수를 카운트하기 위한 SQL 쿼리 문자열을 생성합니다.
 * 사용자가 제공한 매개변수(컬럼 목록, 탐색어, 연관어, 기간, 클러스터 번호)를 기반으로 하여,
 * Ignite 캐시에서 비디오 데이터를 검색하기 위한 조건을 포함한 쿼리를 반환합니다.
 */
export class VideoEntireCountAdapter
  extends VideoBaseAdapter
  implements IGetRelatedVideosEntireCountOutBoundPort
{
  async execute(dao: GetVideoDao): Promise<TRelatedEntireCount> {
    const { search, related, from, to, clusterNumber } = dao;
    const queryString = this.getClusterQueryString(
      [`vd.*`],
      search,
      from,
      to,
      clusterNumber,
      related,
    );
    /**
     * FIXME: dao 클래스안에서 배열로 변환 시킬 방법 찾기
     */
    const clusterNumberValue = Array.isArray(clusterNumber)
      ? clusterNumber[0]
      : clusterNumber;
    const tableName = CacheNameMapper.getVideoDataCacheName(clusterNumberValue);
    try {
      const query = this.createDistributedJoinQuery(
        `SELECT COUNT(*) FROM (` + queryString + `) AS subquery`,
      );
      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoNotFoundError());
      return Ok(resArr);
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
