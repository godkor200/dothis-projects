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
import { Err, Ok } from 'oxide.ts';
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
      if (videoGroup.length === 0) {
        continue; // 비디오 그룹의 길이가 0이면 넘긴다.
      }

      // 클러스터별로 비디오 ID를 그룹화
      const clusterGroups = videoGroup.reduce((acc, { cluster, videoId }) => {
        if (!acc[cluster]) {
          acc[cluster] = [];
        }
        acc[cluster].push(`'${videoId}'`);
        return acc;
      }, {});

      for (const [cluster, videoIds] of Object.entries(clusterGroups)) {
        const currDate = DateUtil.currentDate();
        const tableName = CacheNameMapper.getVideoHistoryCacheName(
          cluster,
          currDate.year,
          currDate.month,
        );
        const joinTableName = CacheNameMapper.getVideoDataCacheName(cluster);
        const categoryQueryPart = `
        SELECT 
          '${category}' AS search,
          vd.video_id, 
          vd.video_title, 
          vh.video_views, 
          ch.channel_name, 
          TO_CHAR(vd.VIDEO_PUBLISHED, 'YYYY-MM-DD HH24:MI:SS') AS video_published 
        FROM ${tableName} vh
        JOIN ${joinTableName} vd ON vd.video_id = vh.video_id
        JOIN ${channelTitle} ch ON vd.channel_id = ch.channel_id
        WHERE vh.video_id IN (${(videoIds as string[]).join(', ')})
        AND vh.DAY = (SELECT MAX(day) FROM ${tableName})
      `;
        categoryQueryParts.push(categoryQueryPart);
      }

      queryComponents.push(`(
      SELECT 
        '${category}' AS search,
        video_id, 
        video_title, 
        video_views, 
        channel_name, 
        TO_CHAR(VIDEO_PUBLISHED, 'YYYY-MM-DD HH24:MI:SS') AS video_published 
      FROM (
        ${categoryQueryParts.join(' UNION ')}
      ) AS category_combined
      ORDER BY video_views DESC
      LIMIT 1
    )`);
    }

    return queryComponents.join(' UNION ');
  }

  async execute(dao: VideoHistoryGetTopViewsByIdsDao): Promise<TIssueTodayRes> {
    const { videos } = dao;
    const query = this.constructQuery(videos);

    const result = await this.executeQuery(query);
    try {
      return Ok(result as ITodayIssue[]);
    } catch (error) {
      return Err(error);
    }
  }

  async executeQuery(queryString: string): Promise<ITodayIssue[]> {
    const tableName = CacheNameMapper.getChannelDataCacheName();
    try {
      const client = this.igniteService.getClient().getCache(tableName);
      const query = this.igniteService.createDistributedJoinQuery(queryString);
      const result = await client.query(query);
      const resArr = await result.getAll();
      return IgniteResultToObjectMapper.mapResultToObjects(resArr, queryString);
    } catch (e) {
      return e;
    }
  }
}
