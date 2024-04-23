import {
  IGetRelatedVideosPaginatedOutBoundPort,
  TRelatedVideos,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { GetVideoDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import {
  DateFormatter,
  VideosResultTransformer,
} from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { DateUtil } from '@Libs/commons/src/utils/date.util';

export class VideoPaginatedAdapter
  extends VideoBaseAdapter
  implements IGetRelatedVideosPaginatedOutBoundPort
{
  /*
   * FIXME: 페이지 네이션 이월 구현
   **/

  async execute(dao: GetVideoDao): Promise<TRelatedVideos> {
    const { search, related, from, to, clusterNumber, limit, page } = dao;
    /**
     * FIXME: 밑에 배열화 시키는거 수정할필요가 있음
     */
    const clusterNumbers = Array.isArray(clusterNumber)
      ? clusterNumber
      : [clusterNumber];
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const { year, month } = DateUtil.currentDate();
    const queryString = clusterNumbers
      .map((cluster) => {
        const tableName = CacheNameMapper.getVideoDataCacheName(cluster);
        const joinTableName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          year,
          month,
        );
        const joinSecTableName = CacheNameMapper.getChannelDataCacheName();
        return `SELECT DISTINCT ${
          this.videoColumns.map((column) => `vd.${column}`) +
          ', ch.channel_name'
        } FROM ${tableName} vd 
                JOIN ${joinTableName} vh 
                ON vd.video_id = vh.video_id 
                JOIN ${joinSecTableName} ch
                ON vd.channel_id = ch.channel_id
          WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%') 
          AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%') 
          AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
      })
      .join(' UNION ');
    const tableName = CacheNameMapper.getVideoDataCacheName(clusterNumbers[0]);
    const pageSize = Number(limit);
    const currentPage = Number(page);
    try {
      const query = this.createDistributedJoinQuery(
        '(' +
          queryString +
          `) LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize}`,
      );

      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoNotFoundError());
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
