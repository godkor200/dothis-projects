import {
  IGetOneVideoHistoryOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IGetVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { QueryGenerator } from '@Libs/commons/src/utils/query-generator';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryBaseAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.base.adapter';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';

export class VideoHistoryGetOneAdapter
  extends VideoHistoryBaseAdapter
  implements IGetOneVideoHistoryOutboundPort
{
  async execute(dao: IGetVideoHistoryDao): Promise<TGetVideoHistoryRes> {
    const { videoId, from, to, clusterNumber } = dao;
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const tableName = CacheNameMapper.getVideoHistoryCacheName(
      clusterNumber,
      fromDate.year.toString(),
      fromDate.month.toString(),
    );

    const queryString = QueryGenerator.generateUnionQuery(
      this.keys,
      clusterNumber,
      tableName,
      videoId,
      fromDate,
      toDate,
    );
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
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
