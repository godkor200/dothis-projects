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
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { Injectable } from '@nestjs/common';
import { GetVideoHistoryGetMultipleByIdV2Dao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';

@Injectable()
export class VideoHistoryGetMultipleByIdV2Adapter
  extends VideoHistoryBaseAdapter
  implements IGetVideoHistoryGetMultipleByIdV2OutboundPort
{
  constructor(private readonly igniteService: IgniteService) {
    super();
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
        if (from.year === to.year && from.month === to.month) {
          return `(SELECT ${
            'vh.' + keys.join(', vh.')
          } FROM ${tableName} vh WHERE vh.VIDEO_ID in (${
            "'" + videoIds[cluster].join(`','`) + "'"
          }) AND vh.DAY BETWEEN ${startDay} AND ${endDay})`;
        }
        const toTableName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          to.year,
          to.month,
        );

        return `((SELECT ${
          'vh.' + keys.join(', vh.')
        } FROM ${tableName} vh WHERE vh.VIDEO_ID = '${videoIds[cluster].join(
          `','`,
        )}' AND vh.DAY BETWEEN ${startDay} AND ${31}) UNION (
      SELECT ${
        'vh.' + keys.join(', vh.')
      } FROM ${toTableName} vh WHERE vh.VIDEO_ID = '${videoIds[cluster].join(
          `','`,
        )}' AND vh.DAY BETWEEN ${1} AND ${endDay}
      ))`;
      })
      .join(' UNION ');
  }

  async execute(
    dao: GetVideoHistoryGetMultipleByIdV2Dao,
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
