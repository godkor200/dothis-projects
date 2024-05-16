import { IGetRelatedVideoChannelHistoryOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { GetRelatedVideoChannelHistoryDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok, Result } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

import { IGetVideoChannelHistoryRes } from '@Apps/modules/video/infrastructure/daos/video.res';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { Injectable } from '@nestjs/common';
export type TGetRelatedVideoChannelHistoryRes = Result<
  IGetVideoChannelHistoryRes[],
  TableNotFoundException | VideoHistoryNotFoundError
>;

/**
 * 날짜 범위를 지정하여 관련 비디오 채널 히스토리를 가져오는 어댑터 클래스
 * 조건:
 *  - video_published 3개월내 이상
 */
@Injectable()
export class VideoChannelHistoryAdapter
  extends VideoBaseAdapter
  implements IGetRelatedVideoChannelHistoryOutboundPort
{
  constructor(private readonly igniteService: IgniteService) {
    super();
  }

  /**
   * 지정된 날짜 범위(fromDate ~ toDate) 내에서 관련 비디오 채널 히스토리를 가져옵니다.
   * @param dao - 비디오 채널 히스토리 조회에 필요한 DAO 객체
   * @returns 관련 비디오 채널 히스토리 데이터 또는 오류
   * 연관 api:
   * 1. https://api.dothis.kr/docs#/%EC%A1%B0%ED%9A%8C%EC%88%98/ExpectedHitsV1HttpController_execute
   */
  async execute(
    dao: GetRelatedVideoChannelHistoryDao,
  ): Promise<TGetRelatedVideoChannelHistoryRes> {
    const { search, related, relatedCluster, from, to } = dao;

    try {
      const fromDate = DateFormatter.getFormattedDate(from);
      const toDate = DateFormatter.getFormattedDate(to);
      const tableName = CacheNameMapper.getVideoHistoryCacheName(
        relatedCluster[0],
        fromDate.year.toString(),
        fromDate.month.toString(),
      );
      const queries = relatedCluster.map((cluster) => {
        const tableName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          fromDate.year.toString(),
          fromDate.month.toString(),
        );

        const joinTableName = CacheNameMapper.getVideoDataCacheName(cluster);

        const channelIdTableName = CacheNameMapper.getChannelHistoryCacheName(
          toDate.year.toString(),
          toDate.month.toString(),
        );
        let relatedCondition = '';
        if (related) {
          relatedCondition = `AND (
        vd.video_title LIKE '%${related}%'
        OR vd.video_tags LIKE '%${related}%'
      )`;
        }
        if (fromDate.month === toDate.month && fromDate.year === toDate.year) {
          return `SELECT
                    vh.VIDEO_ID,
                    vh.VIDEO_VIEWS,
                    ch.channel_id,
                    ch.channel_average_views,
                    vh.YEAR,
                    vh.MONTH,
                    vh.DAY
                  FROM
                    ${tableName} vh
                    JOIN ${joinTableName} vd ON vd.video_id = vh.video_id
                    JOIN (
                      SELECT
                        channel_id,
                        channel_average_views
                      FROM
                        ${channelIdTableName}
                      WHERE
                        day = (SELECT MAX(day) FROM ${channelIdTableName})
                    ) ch ON ch.channel_id = vd.channel_id
                  WHERE
                    (
                      vd.video_title LIKE '%${search}%'
                      OR vd.video_tags LIKE '%${search}%'
                    )
                   ${relatedCondition}
                    AND (
                      vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day}
                    )
                    AND VD.video_published >= DATEADD(month, -3, CURRENT_TIMESTAMP)
                  `;
        } else {
          const tableSecName = CacheNameMapper.getVideoHistoryCacheName(
            cluster,
            toDate.year.toString(),
            toDate.month.toString(),
          );
          return `(SELECT
                    vh.VIDEO_ID,
                    vh.VIDEO_VIEWS,
                    ch.channel_id,
                    ch.channel_average_views,
                    vh.YEAR,
                    vh.MONTH,
                    vh.DAY
                  FROM
                    ${tableName} vh
                    JOIN ${joinTableName} vd ON vd.video_id = vh.video_id
                    JOIN (
                      SELECT
                        channel_id,
                        channel_average_views
                      FROM
                        ${channelIdTableName}
                      WHERE
                        day = (SELECT MAX(day) FROM ${channelIdTableName})
                    ) ch ON ch.channel_id = vd.channel_id
                  WHERE
                    (
                      vd.video_title LIKE '%${search}%'
                      OR vd.video_tags LIKE '%${search}%'
                    )
                   ${relatedCondition}
                    AND (
                      vh.DAY >= ${fromDate.day}
                    )
                    AND VD.video_published >= DATEADD(month, -3, CURRENT_TIMESTAMP)
                    ) UNION (
                  SELECT
                    vh.VIDEO_ID,
                    vh.VIDEO_VIEWS,
                    ch.channel_id,
                    ch.channel_average_views,
                    vh.YEAR,
                    vh.MONTH,
                    vh.DAY
                  FROM
                    ${tableSecName} vh
                    JOIN ${joinTableName} vd ON vd.video_id = vh.video_id
                    JOIN (
                      SELECT
                        channel_id,
                        channel_average_views
                      FROM
                        ${channelIdTableName}
                      WHERE
                        day = (SELECT MAX(day) FROM ${channelIdTableName})
                    ) ch ON ch.channel_id = vd.channel_id
                  WHERE
                    (
                      vd.video_title LIKE '%${search}%'
                      OR vd.video_tags LIKE '%${search}%'
                    )
                    ${relatedCondition}
                    AND (
                      vh.DAY <= ${toDate.day}
                    )
                    AND VD.video_published >= DATEADD(month, -3, CURRENT_TIMESTAMP)
                    )
                  `;
        }
      });

      const queryString = queries.join(' UNION ');
      const query = this.igniteService.createDistributedJoinQuery(queryString);
      const cache = await this.igniteService.getClient().getCache(tableName);
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
