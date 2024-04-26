import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { TRelatedVideoAndHistoryRes } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
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

export class ExtendedVideoHistoryListAdapter
  extends VideoBaseAdapter
  implements IGetListVideoHistoryOutboundPort
{
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
