import {
  IGetVideoHistoryGetMultipleByIdV2OutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import {
  DateFormatter,
  DateFormatterRes,
} from '@Libs/commons/src/utils/videos.date-formatter';
import {
  CacheNameMapper,
  IgniteResultToObjectMapper,
} from '@Apps/common/ignite/mapper';
import { VideoHistoryBaseAdapter } from '@Apps/modules/video-history/infrastructure/adapters';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import {
  ComplexQueryException,
  TableNotFoundException,
} from '@Libs/commons/src/exceptions/exceptions';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { Injectable } from '@nestjs/common';
import { GetVideoHistoryMultipleByIdV2Dao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';

@Injectable()
export class VideoHistoryGetMultipleByIdV2Adapter
  extends VideoHistoryBaseAdapter
  implements IGetVideoHistoryGetMultipleByIdV2OutboundPort
{
  constructor(private readonly igniteService: IgniteService) {
    super();
  }

  private constructSingleQuery(
    keys: string[],
    tableName: string,
    videoId: string,
    startDay: number,
    endDay: number,
  ): string {
    const modifiedKeys = this.modifyKeys(keys, 'VIDEO_PERFORMANCE');
    return `(SELECT ${modifiedKeys.join(
      ',',
    )} FROM ${tableName} WHERE VIDEO_ID = '${videoId}' AND DAY BETWEEN ${startDay} AND ${endDay})`;
  }

  private constructMultipleQuery(
    keys: string[],
    tableName: string,
    videoIds: string[],
    startDay: number,
    endDay: number,
  ): string {
    const modifiedKeys = this.modifyKeys(keys, 'VIDEO_PERFORMANCE');
    return `(SELECT ${modifiedKeys.join(
      ', ',
    )} FROM ${tableName} vh WHERE VIDEO_ID in ('${videoIds.join(
      `','`,
    )}') AND DAY BETWEEN ${startDay} AND ${endDay})`;
  }

  private queryString(
    keys: string[],
    videoIds: Record<string, string[]>,
    from: DateFormatterRes,
    to: DateFormatterRes,
  ): string {
    return Object.keys(videoIds)
      .map((cluster: string) => {
        const tableName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          from.year,
          from.month,
        );
        const startDay = from.day;
        const endDay = to.day;
        const ids = videoIds[cluster];

        if (from.year === to.year && from.month === to.month) {
          return ids.length === 1
            ? this.constructSingleQuery(
                keys,
                tableName,
                ids[0],
                startDay,
                endDay,
              )
            : this.constructMultipleQuery(
                keys,
                tableName,
                ids,
                startDay,
                endDay,
              );
        }

        const toTableName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          to.year,
          to.month,
        );

        const fromQuery =
          ids.length === 1
            ? this.constructSingleQuery(keys, tableName, ids[0], startDay, 31)
            : this.constructMultipleQuery(keys, tableName, ids, startDay, 31);

        const toQuery =
          ids.length === 1
            ? this.constructSingleQuery(keys, toTableName, ids[0], 1, endDay)
            : this.constructMultipleQuery(keys, toTableName, ids, 1, endDay);

        return `(${fromQuery} UNION ${toQuery})`;
      })
      .join(' UNION ');
  }

  async execute(
    dao: GetVideoHistoryMultipleByIdV2Dao,
  ): Promise<TGetVideoHistoryRes> {
    const { videoIds, from, to } = dao;

    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const tableName = CacheNameMapper.getVideoHistoryCacheName(
      Object.keys(videoIds)[0],
      fromDate.year,
      fromDate.month,
    );

    const queryString = this.queryString(this.keys, videoIds, fromDate, toDate);

    try {
      const cache = await this.igniteService.getClient().getCache(tableName);
      const query = this.igniteService.createDistributedJoinQuery(queryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());
      const processedArr = resArr.map((row) => {
        if (
          typeof row.VIDEO_PERFORMANCE === 'string' &&
          row.VIDEO_PERFORMANCE.includes('.')
        ) {
          row.VIDEO_PERFORMANCE = parseFloat(row.VIDEO_PERFORMANCE);
        } else if (
          typeof row.VIDEO_PERFORMANCE === 'number' &&
          !isFinite(row.VIDEO_PERFORMANCE)
        ) {
          row.VIDEO_PERFORMANCE = parseFloat(row.VIDEO_PERFORMANCE.toString());
        }
        return row;
      });
      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(
          processedArr,
          queryString,
        ),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      if (e.message.includes('Too complex query to process.')) {
        return Err(new ComplexQueryException(e.message));
      }
      console.log('Error:', e);
      return Err(e);
    }
  }
}
