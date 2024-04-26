import { VideoHistoryBaseAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.base.adapter';
import {
  IGetVideoHistoryGetMultipleByIdOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IGetVideoHistoryGetMultipleByIdDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
export class VideoHistoryGetMultipleByIdAdapter
  extends VideoHistoryBaseAdapter
  implements IGetVideoHistoryGetMultipleByIdOutboundPort
{
  /**
   * 비디오 아이디를 여러개 받아서 여러 비디오의 히스토리를 리턴
   * @param dao
   */
  async execute(
    dao: IGetVideoHistoryGetMultipleByIdDao,
  ): Promise<TGetVideoHistoryRes> {
    const { videoIds, clusterNumber } = dao;

    const { year, month } = DateUtil.currentDate();
    const tableName = CacheNameMapper.getVideoHistoryCacheName(
      clusterNumber[0],
      year,
      month,
    );
    /**
     * FIXME: dao 클래스안에서 배열로 변환 시킬 방법 찾기
     */
    const cluster = Array.isArray(clusterNumber)
      ? clusterNumber
      : [clusterNumber];
    const queryUnion = cluster.map((cluster) => {
      const tableName = CacheNameMapper.getVideoHistoryCacheName(
        cluster,
        year,
        month,
      );

      return `SELECT vh.video_id, vh.video_views, vh.DAY FROM ${tableName} vh WHERE vh.video_id in (${
        "'" + videoIds.join(`', '`) + "'"
      })`;
    });
    let queryString: string;
    if (clusterNumber.length > 1) {
      queryString = queryUnion.join(' UNION ');
    } else {
      queryString = queryUnion[0];
    }
    try {
      const cache = await this.client.getCache(tableName);
      const query = this.createDistributedJoinQuery(queryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());

      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      return Err(e); // 호출자에게 에러 정보 반환
    }
  }
}
