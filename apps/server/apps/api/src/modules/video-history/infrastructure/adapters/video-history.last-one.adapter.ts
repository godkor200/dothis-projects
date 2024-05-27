import { VideoHistoryBaseAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.base.adapter';
import {
  IGetLastVideoHistoryOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IGetLastVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { QueryGenerator } from '@Libs/commons/src/utils/query-generator';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class VideoHistoryLastOneAdapter
  extends VideoHistoryBaseAdapter
  implements IGetLastVideoHistoryOutboundPort
{
  constructor(private readonly igniteService: IgniteService) {
    super();
  }

  async execute(dao: IGetLastVideoHistoryDao): Promise<TGetVideoHistoryRes> {
    const { clusterNumber, from, to, videoId } = dao;
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER`;
    const queryString = QueryGenerator.generateUnionQuery(
      this.keys,
      clusterNumber,
      tableName,
      videoId,
      fromDate,
      toDate,
    );
    try {
      const cache = await this.igniteService
        .getClient()
        .getCache(
          tableName + `_${clusterNumber}_${fromDate.year}${fromDate.month}`,
        );

      const query = this.igniteService.createDistributedJoinQuery(
        `SELECT * FROM (${tableName}_${clusterNumber}_${fromDate.year}_${fromDate.month}) AS combinedQuery ORDER BY DAY DESC LIMIT 1`,
      );

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
