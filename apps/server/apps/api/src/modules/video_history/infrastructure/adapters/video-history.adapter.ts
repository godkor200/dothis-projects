import {
  TGetVideoHistoryRes,
  VideoHistoryOutboundPort,
} from '@Apps/modules/video_history/domain/ports/video-history.outbound.port';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { IGetVideoHistoryDao } from '@Apps/modules/video_history/infrastructure/daos/video-history.dao';
import {
  VideosDateFormatter,
  VideosResultTransformer,
} from '@Apps/modules/video/infrastructure/utils';
import { Ok } from 'oxide.ts';
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
    const fromDate = VideosDateFormatter.getFormattedDate(from);
    const toDate = VideosDateFormatter.getFormattedDate(to);
    const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${clusterNumber}_${fromDate.year}_${fromDate.month}`;
    const queryString = `SELECT ${this.keys.join(
      ', ',
    )} FROM ${tableName} vh WHERE vh.video_id = '${videoId}' AND (vh.DAY BETWEEN ${
      fromDate.day
    } AND ${toDate.day});`;
    const cache = await this.client.getCache(tableName);

    const query = new SqlFieldsQuery(queryString);
    const result = await cache.query(query);
    const resArr = await result.getAll();
    return Ok(VideosResultTransformer.mapResultToObjects(resArr, queryString));
  }
}
