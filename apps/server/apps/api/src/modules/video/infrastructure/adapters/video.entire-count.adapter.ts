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
 *
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
