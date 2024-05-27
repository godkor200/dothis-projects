import { ChannelBaseAdapter } from '@Apps/modules/channel/infrastucture/adapters/channel.base.adapter';
import { InfluentialChannelProfileOutboundPort } from '@Apps/modules/channel/domain/ports/channel-profile.outbound.port';
import {
  ChannelProfileDao,
  TChannelProfileRes,
} from '@Apps/modules/channel/infrastucture/daos/channel.dao';
import { Err, Ok } from 'oxide.ts';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';

/**
 * 동영상 관련된 현재 날짜에 영향력있는 채널들을 불러오는 어뎁터
 * 채널 정보 조회: 검색어, 관련 검색어, 클러스터 번호, 날짜 범위 등의 조건을 사용하여 채널 정보를 조회합니다.
 * 쿼리 생성: 각 클러스터별로 쿼리를 생성하고, 이를 UNION으로 결합하여 최종 쿼리를 만듭니다.
 * 정렬 및 LIMIT 적용: 정렬 기준과 LIMIT 5를 적용하여 상위 5개의 채널 정보를 반환합니다.
 * 예외 처리: 테이블을 찾을 수 없는 경우 TableNotFoundException을, 결과가 없는 경우 NotFoundException을 반환합니다.
 * ref: 없음
 */
@Injectable()
export class InfluentialChannelProfileAdapter
  extends ChannelBaseAdapter
  implements InfluentialChannelProfileOutboundPort
{
  constructor(private readonly igniteService: IgniteService) {
    super();
  }
  /**
   * execute 메서드는 ChannelProfileDao 객체를 입력받아 해당 조건에 맞는 채널 정보를 반환합니다.
   *
   * @param dao - ChannelProfileDao 객체. 검색어, 관련 검색어, 클러스터 번호, 날짜 범위, 정렬 기준 등의 정보를 포함합니다.
   * @returns Promise<TChannelProfileRes> - 채널 정보를 담은 객체. 조회에 실패할 경우 에러를 반환합니다.
   */
  async execute(dao: ChannelProfileDao): Promise<TChannelProfileRes> {
    const {
      search,
      related,
      relatedCluster,
      from,
      to,
      sort = 'channel_subscribers',
      order = 'DESC',
    } = dao;
    const current = DateUtil.currentDate();
    const tableName = CacheNameMapper.getChannelDataCacheName();
    const channelIdTableName = CacheNameMapper.getChannelHistoryCacheName(
      current.year,
      current.month,
    );
    const queries = relatedCluster.map((cluster) => {
      return `(
                SELECT 
                  cd.channel_name, 
                  cd.channel_cluster, 
                  cd.mainly_used_keywords, 
                  ch.channel_subscribers, 
                  ch.channel_average_views
                FROM 
                  (
                    SELECT DISTINCT
                      channel_id
                    FROM 
                      ${CacheNameMapper.getVideoDataCacheName(cluster)} vd
                    WHERE 
                      (vd.video_title LIKE '%${search}%' OR vd.video_tags LIKE '%${search}%')
                  AND (vd.video_title LIKE '%${related}%' OR vd.video_tags LIKE '%${related}%')
                  ) AS filtered_videos
                JOIN 
                  ${tableName} cd ON filtered_videos.channel_id = cd.channel_id
                JOIN 
                  (
                    SELECT 
                      channel_id, 
                      MAX(channel_subscribers) AS channel_subscribers, 
                      MAX(channel_average_views) AS channel_average_views
                    FROM 
                      ${channelIdTableName}
                    WHERE 
                      DAY = (SELECT MAX(DAY) FROM ${channelIdTableName})
                    GROUP BY 
                      channel_id
                  ) ch ON cd.channel_id = ch.channel_id
              )`;
    });
    try {
      let queryString = queries.join(' UNION ');
      queryString =
        '(' + queryString + `) ORDER BY \n  ${sort} ${order}\n LIMIT 5`;
      const query = this.igniteService.createDistributedJoinQuery(queryString);
      const cache = await this.igniteService.getClient().getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new NotFoundException());
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
