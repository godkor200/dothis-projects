import {
  TGetVideoHistoryRes,
  VideoHistoryOutboundPort,
} from '@Apps/modules/video_history/domain/ports/video-history.outbound.port';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { IGetVideoHistoryDao } from '@Apps/modules/video_history/infrastructure/daos/video-history.dao';
import {
  DateFormatter,
  VideosResultTransformer,
} from '@Apps/modules/video/infrastructure/utils';
import { Err, Ok } from 'oxide.ts';
import { QueryGenerator } from '@Libs/commons/src/utils/query-generator';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/events/video_history.err';
const IgniteClient = require('apache-ignite-client');

const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;

export class VideoHistoryAdapter
  extends IgniteService
  implements VideoHistoryOutboundPort
{
  private readonly keys: string[] = [
    'VIDEO_ID',
    'VIDEO_VIEWS',
    'VIDEO_LIKES',
    'VIDEO_COMMENTS',
    'VIDEO_PERFORMANCE',
    'YEAR',
    'MONTH',
    'DAY',
  ];

  /**
   * 날짜 범위 수정
   * @param dao
   */
  async getHistory(dao: IGetVideoHistoryDao): Promise<TGetVideoHistoryRes> {
    const { videoId, from, to, clusterNumber } = dao;
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
      const cache = await this.client.getCache(
        tableName + `_${clusterNumber}_${fromDate.year}_${fromDate.month}`,
      );

      const query = new SqlFieldsQuery(queryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());

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
