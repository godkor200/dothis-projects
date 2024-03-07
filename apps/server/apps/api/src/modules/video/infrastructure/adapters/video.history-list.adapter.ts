import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import {
  IGetRelatedVideoAndVideoHistoryOutBoundPort,
  TRelatedVideoAndHistoryRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { RelatedVideoAndVideoHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/events/video_history.err';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';

export class VideoHistoryListAdapter
  extends VideoBaseAdapter
  implements IGetRelatedVideoAndVideoHistoryOutBoundPort
{
  async execute(
    dao: RelatedVideoAndVideoHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes> {
    const { search, related, from, to, clusterNumber } = dao;

    try {
      const fromDate = DateFormatter.getFormattedDate(from);
      const toDate = DateFormatter.getFormattedDate(to);
      const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${clusterNumber}_${fromDate.year}_${fromDate.month}`;
      const joinTableName = `DOTHIS.VIDEO_DATA_CLUSTER_${clusterNumber}`;

      const cache = await this.client.getCache(tableName);
      const queryString = `SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, vh.YEAR, vh.MONTH, vh.DAY
       FROM ${tableName} vh JOIN ${joinTableName} vd 
       ON vd.video_id = vh.video_id
       WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
       AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%')
       AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
      const query = new this.SqlFieldsQuery(queryString);

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
