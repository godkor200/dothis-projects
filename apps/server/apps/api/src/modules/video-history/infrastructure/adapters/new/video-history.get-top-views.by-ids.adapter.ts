import { IVideoHistoryGetTopViewsByIdsOutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import {
  CacheNameMapper,
  IgniteResultToObjectMapper,
} from '@Apps/common/ignite/mapper';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { VideoHistoryGetTopViewsByIdsDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { VideoHistoryBaseAdapter } from '@Apps/modules/video-history/infrastructure/adapters';
import { Injectable } from '@nestjs/common';
import { ITodayIssue } from '@Apps/modules/video/infrastructure/daos/video.res';
import { Ok } from 'oxide.ts';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';

@Injectable()
export class VideoHistoryGetTopViewsByIdsAdapter
  extends VideoHistoryBaseAdapter
  implements IVideoHistoryGetTopViewsByIdsOutboundPort
{
  constructor(private readonly igniteService: IgniteService) {
    super();
  }

  private constructQuery(
    videos: Record<string, { cluster: string; videoId: string }[]>,
  ): string {
    const channelTitle = CacheNameMapper.getChannelDataCacheName();
    let queryComponents = [];

    for (const category of Object.keys(videos)) {
      let categoryQueryParts = [];
      const videoGroup = videos[category];

      for (const { cluster, videoId } of videoGroup) {
        const currDate = DateUtil.currentDate();
        const tableName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          currDate.year,
          currDate.month,
        );
        const joinTableName = CacheNameMapper.getVideoDataCacheName(cluster);

        const categoryQueryPart = `
          SELECT 
            '${category}' AS category,  -- 카테고리명을 포함시킨다.
            vd.video_id, 
            vd.video_title, 
            vh.video_views, 
            ch.channel_name, 
            TO_CHAR(vd.VIDEO_PUBLISHED, 'YYYY-MM-DD HH24:MI:SS') as video_published 
          FROM ${tableName} vh
          JOIN ${joinTableName} vd ON vd.video_id = vh.video_id
          JOIN ${channelTitle} ch ON vd.channel_id = ch.channel_id
          WHERE vh.video_id = '${videoId}'
          AND vh.DAY = (SELECT MAX(day) FROM ${tableName})
        `;
        categoryQueryParts.push(categoryQueryPart);
      }

      queryComponents.push(`(
        SELECT 
            '${category}' AS category,
            video_id, 
            video_title, 
            video_views, 
            channel_name, 
            TO_CHAR(VIDEO_PUBLISHED, 'YYYY-MM-DD HH24:MI:SS') AS video_published 
        FROM (
          ${categoryQueryParts.join(' UNION ALL ')}
        ) AS category_combined
        ORDER BY video_views DESC
        LIMIT 1
      )`);
    }

    return queryComponents.join(' UNION ALL ');
  }

  async execute(dao: VideoHistoryGetTopViewsByIdsDao): Promise<TIssueTodayRes> {
    const { videos } = dao;
    const query = this.constructQuery(videos);
    const result = await this.executeQuery(query);
    return Ok(result as ITodayIssue[]);
  }

  async executeQuery(queryString: string): Promise<ITodayIssue[]> {
    const tableName = CacheNameMapper.getChannelDataCacheName();
    try {
      const client = this.igniteService.getClient().getCache(tableName);
      const query = this.igniteService.createDistributedJoinQuery(queryString);
      const result = await client.query(query);
      const resArr = await result.getAll();
      console.log(resArr);
      return IgniteResultToObjectMapper.mapResultToObjects(resArr, queryString);
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
