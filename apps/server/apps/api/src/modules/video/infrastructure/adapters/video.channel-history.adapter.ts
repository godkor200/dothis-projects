import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { IGetRelatedVideoChannelHistoryOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetRelatedVideoChannelHistoryDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok, Result } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/events/video_history.err';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { IGetVideoChannelHistoryRes } from '@Apps/modules/video/infrastructure/daos/video.res';
const IgniteClient = require('apache-ignite-client');
export type TGetRelatedVideoChannelHistoryRes = Result<
  IGetVideoChannelHistoryRes[],
  TableNotFoundException | VideoHistoryNotFoundError
>;
const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
export class VideoChannelHistoryAdapter
  extends VideoBaseAdapter
  implements IGetRelatedVideoChannelHistoryOutboundPort
{
  /**
   * 설명:
   * - 1.
   * 연관 api:
   * 1. https://api.dothis.kr/docs#/%EC%A1%B0%ED%9A%8C%EC%88%98/ExpectedHitsV1HttpController_execute
   * @param dao
   */
  async getVideoChannelHistory(
    dao: GetRelatedVideoChannelHistoryDao,
  ): Promise<TGetRelatedVideoChannelHistoryRes> {
    /**
     *  일단 데이터 클러스터가 완전하지 않아 0-1 클러스터로 제한
     */
    const { search, related, relatedCluster, from, to } = dao;

    try {
      const fromDate = DateFormatter.getFormattedDate(from);
      const toDate = DateFormatter.getFormattedDate(to);
      const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${relatedCluster[0]}_${fromDate.year}_${fromDate.month}`;
      const channelIdTableName = `DOTHIS.CHANNEL_HISTORY`;
      const queries = relatedCluster.map((cluster) => {
        const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${cluster}_${fromDate.year}_${fromDate.month}`;
        const joinTableName = `DOTHIS.VIDEO_DATA_CLUSTER_${cluster}`;
        const today = new Date().toISOString().split('T')[0];
        /**
         * 하기 날짜로 최신데이터를 불러오게끔 해야되나 지금 데이터가 완전하지 않음
         */
        const year = Number(today.split('-')[0]);
        const month = Number(today.split('-')[1]);
        const day = Number(today.split('-')[2]);
        const yesterday = day - 1;
        return `SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, vh.DAY, ch.channel_id, ch.channel_average_views
      FROM ${tableName} vh
      JOIN ${joinTableName} vd ON vd.video_id = vh.video_id
      JOIN (
        SELECT channel_id, channel_average_views
        FROM ${channelIdTableName}
        WHERE (year, month, day) = (
            CASE 
                WHEN EXISTS (SELECT 1 FROM DOTHIS.CHANNEL_HISTORY WHERE year = 2024 AND month = 2 AND day = 26)
                THEN (2024, 2, 26)
                ELSE (2024, 2, 25)
            END
                                    )
            ) ch ON ch.channel_id = vd.channel_id
      WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
      AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%')
      AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
      });

      const queryString = queries.join(' UNION ');
      const query = new SqlFieldsQuery(queryString);
      const cache = await this.client.getCache(tableName);
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
