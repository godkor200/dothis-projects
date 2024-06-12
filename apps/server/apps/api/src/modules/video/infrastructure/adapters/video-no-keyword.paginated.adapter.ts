import { Injectable } from '@nestjs/common';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { IGetVideoVideoNoKeywordPaginatedOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoNoKeywordPaginatedDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import {
  CacheNameMapper,
  IgniteResultToObjectMapper,
} from '@Apps/common/ignite/mapper';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { TVideoRes } from '@Apps/modules/video/infrastructure/daos/video.res';

/**
 * 대량의 비디오를 video_id만으로 페이지네이션 방식으로 리턴합니다.
 */
@Injectable()
export class VideoNoKeywordPaginatedAdapter
  extends VideoBaseAdapter
  implements IGetVideoVideoNoKeywordPaginatedOutboundPort
{
  constructor(private readonly igniteService: IgniteService) {
    super();
  }
  private queryString(
    videoIds: Record<string, string[]>,
    from: string,
    to: string,
  ): string {
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);

    const queryParts = Object.keys(videoIds).map((cluster) => {
      const tableName = CacheNameMapper.getVideoHistoryCacheName(
        cluster,
        toDate.year,
        toDate.month,
      );
      const joinTableName = CacheNameMapper.getVideoDataCacheName(cluster);
      const joinSecTableName = CacheNameMapper.getChannelDataCacheName();

      return `SELECT vh.video_views, ch.channel_name, ${this.videoColumns.map(
        (column) => `vd.${column}`,
      )} FROM ${tableName} vh 
                JOIN ${joinTableName} vd
                ON vd.video_id = vh.video_id
                JOIN ${joinSecTableName} ch
                ON vd.channel_id = ch.channel_id  
                WHERE vh.VIDEO_ID in (${
                  "'" + videoIds[cluster].join(`','`) + "'"
                }) AND vh.DAY = (SELECT MAX(day) FROM ${tableName})`;
    });
    return queryParts.length > 1 ? queryParts.join(' UNION ') : queryParts[0];
  }
  async execute(dao: VideoNoKeywordPaginatedDao): Promise<TVideoRes> {
    const {
      videoIds,
      from,
      to,
      limit,
      sort = 'video_views',
      page,
      order,
    } = dao;
    const queryString = this.queryString(videoIds, from, to);

    try {
      const tableName = CacheNameMapper.getVideoDataCacheName(
        Object.keys(videoIds)[0],
      );

      const pageSize = Number(limit);
      const currentPage = Number(page);
      const query = this.igniteService.createDistributedJoinQuery(
        `(${queryString}) ORDER BY ${sort} ${order} LIMIT ${pageSize} OFFSET ${
          (currentPage - 1) * pageSize
        };`,
      );

      const cache = await this.igniteService.getClient().getCache(tableName);
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
      return Err(e);
    }
  }
}
