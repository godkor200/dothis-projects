import { VideoHistoryBaseAdapter } from '@Apps/modules/video-history/infrastructure/adapters';
import {
  IGetVideoHistoryLastOneByIdsOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { GetVideoHistoryMultipleByIdAndRelatedWordsDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Injectable } from '@nestjs/common';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { DateFormatterRes } from '@Libs/commons/src/utils/videos.date-formatter';
import {
  CacheNameMapper,
  IgniteResultToObjectMapper,
} from '@Apps/common/ignite/mapper';
import {
  DateUtil,
  DateUtilsResultType,
} from '@Libs/commons/src/utils/date.util';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';

@Injectable()
export class VideoHistoryGetLastOneByIdsAdapter
  extends VideoHistoryBaseAdapter
  implements IGetVideoHistoryLastOneByIdsOutboundPort
{
  constructor(private readonly igniteService: IgniteService) {
    super();
  }
  private queryString(
    keys: string[],
    videoIds: Record<string, string[]>,
    from: DateUtilsResultType,
  ): string {
    return Object.keys(videoIds)
      .map((cluster: string) => {
        const tableName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          from.year,
          from.month,
        );

        return `(SELECT ${
          'vh.' + keys.join(', vh.')
        } FROM ${tableName} vh WHERE vh.VIDEO_ID in (${
          "'" + videoIds[cluster].join(`','`) + "'"
        }) AND vh.DAY = (SELECT MAX(day) FROM ${tableName}))`;
      })
      .join(' UNION ');
  }
  async execute(
    dao: GetVideoHistoryMultipleByIdAndRelatedWordsDao,
  ): Promise<TGetVideoHistoryRes> {
    const videoIds = dao.videoIds;
    const current = DateUtil.currentDate();
    const tableName = CacheNameMapper.getVideoHistoryCacheName(
      Object.keys(videoIds)[0],
      current.year,
      current.month,
    );
    const queryString = this.queryString(this.keys, videoIds, current);

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
