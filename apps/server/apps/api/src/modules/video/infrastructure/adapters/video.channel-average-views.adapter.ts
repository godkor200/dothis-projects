import {
  IGetVideoAndChannelViewsByDateAndKeywordsOutboundPort,
  TGetVideoAndChannelViewsByDateAndKeywordsRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { GetVideoAndChannelViewsByDateAndKeywordsDao } from '@Apps/modules/video/infrastructure/daos/video.dao';

import { Err, Ok } from 'oxide.ts';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';

/**
 *
 *  두 번의 조인 쿼리를 사용하여 특정 기간과 키워드에 맞는 비디오 및 채널의 조회수 평균을 계산하는 어댑터.
 *  이 클래스는 느린 쿼리 성능을 개선하기 위한 스플릿 구조의 가능성을 탐구하며,
 *  비디오 및 채널 조회수 평균을 효율적으로 가져오는 메커니즘을 구현합니다.
 *
 * ref: 두번 조인 쿼리는 어떻게 하든 느림.... 그러나 스플릿이 완성되면 다를수도 있음
 */
export class VideoChannelAverageViewsAdapter
  extends VideoBaseAdapter
  implements IGetVideoAndChannelViewsByDateAndKeywordsOutboundPort
{
  /**
   * 특정 날짜 범위와 키워드를 기반으로 비디오 및 채널의 조회수 평균을 검색합니다.
   * 이 메소드는 비디오 제목 또는 태그가 주어진 검색어와 관련된 항목을 찾고, 동일한 기준으로 채널 데이터를 조인하여 결과를 반환합니다.
   *
   * @param dao GetVideoAndChannelViewsByDateAndKeywordsDao - 검색어, 관련어, 관련 클러스터, 시작 및 종료 날짜를 포함하는 객체.
   * @returns Promise<TGetVideoAndChannelViewsByDateAndKeywordsRes> - 검색 결과에 해당하는 비디오 및 채널 조회수 데이터를 담은 객체 또는 에러.
   */
  async execute(
    dao: GetVideoAndChannelViewsByDateAndKeywordsDao,
  ): Promise<TGetVideoAndChannelViewsByDateAndKeywordsRes> {
    const { search, related, relatedCluster, from, to } = dao;

    try {
      const fromDate = DateFormatter.getFormattedDate(from);
      const toDate = DateFormatter.getFormattedDate(to);
      const relatedClusterIndex = relatedCluster[0];
      const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${relatedClusterIndex}_${fromDate.year}_${fromDate.month}`;
      const channelIdTableName = `DOTHIS.CHANNEL_HISTORY`;

      const queries = relatedCluster.map((cluster) => {
        const joinTableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${cluster}_${fromDate.year}_${fromDate.month}`;
        const tableName = `DOTHIS.VIDEO_DATA_CLUSTER_${cluster}`;
        const dayToCheck = toDate.day;

        return `SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, ch.channel_id, ch.channel_average_views
        FROM ${tableName} vd
        JOIN (SELECT VIDEO_ID, VIDEO_VIEWS, DAY 
              FROM ${joinTableName} 
              WHERE (day) = (
              CASE 
                  WHEN EXISTS (SELECT 1 FROM ${joinTableName} WHERE day = ${dayToCheck})
                  THEN (${dayToCheck})
                  ELSE (${dayToCheck} - 1)
              END
                            )
             ) vh ON vd.video_id = vh.video_id
        JOIN ( 
          SELECT channel_id, channel_average_views
          FROM ${channelIdTableName}
          WHERE (year, month, day) = (
              CASE 
                  WHEN EXISTS (SELECT 1 FROM ${channelIdTableName} WHERE year = ${toDate.year} AND month = ${toDate.month} AND day = ${dayToCheck})
                  THEN (${toDate.year}, ${toDate.month}, ${dayToCheck})
                  ELSE (${toDate.year}, ${toDate.month}, ${dayToCheck} - 1)
              END
                                      )
              ) ch ON ch.channel_id = vd.channel_id
        WHERE (vd.video_title LIKE '%${search}%' OR vd.video_tags LIKE '%${search}%')
        AND (vd.video_title LIKE '%${related}%' OR vd.video_tags LIKE '%${related}%')
        AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
      });

      const queryString = queries.join(' UNION ');
      const query = this.createDistributedJoinQuery(queryString);
      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoNotFoundError());

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
