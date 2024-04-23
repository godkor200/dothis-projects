import { ChannelBaseAdapter } from '@Apps/modules/channel/infrastucture/adapters/channel.base.adapter';
import { ChannelProfileOutboundPort } from '@Apps/modules/channel/domain/ports/channel-profile.outbound.port';
import {
  ChannelProfileDao,
  TChannelProfileRes,
} from '@Apps/modules/channel/infrastucture/daos/channel.dao';
import { Err, Ok } from 'oxide.ts';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { NotFoundException } from '@nestjs/common';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { DateUtil } from '@Libs/commons/src/utils/date.util';

/**
 * 동영상 관련된 영향력있는 채널들을 불러오는 어뎁터 5개
 * ref: 없음
 */
export class ChannelProfileAdapter
  extends ChannelBaseAdapter
  implements ChannelProfileOutboundPort
{
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
    const tableName = `dothis.channel_data`;
    const channelIdTableName = `dothis.channel_history_${current.year}${current.month}`;
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
                      channel_subscribers, 
                      channel_average_views
                    FROM 
                      ${channelIdTableName}
                    WHERE 
                     DAY = ${current.day}
                  ) ch ON cd.channel_id = ch.channel_id
              )`;
    });
    try {
      let queryString = queries.join(' UNION ');
      queryString =
        '(' + queryString + `) ORDER BY \n  ${sort} ${order}\nLIMIT 5`;
      const query = this.createDistributedJoinQuery(queryString);
      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new NotFoundException());
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
