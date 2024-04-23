import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { SearchRelationVideoDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import {
  IGetRelatedVideoOutboundPort,
  TRelatedVideos,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { IVideoSchema } from '@Apps/modules/video/infrastructure/daos/video.res';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';

export class VideoListAdapterEntireCluster
  extends VideoBaseAdapter
  implements IGetRelatedVideoOutboundPort
{
  async execute(dao: SearchRelationVideoDao): Promise<TRelatedVideos> {
    const { search, related, from, to } = dao;

    try {
      const videoCacheTable = CacheNameMapper.getVideoDataCacheName(related);
      const fromDate = DateFormatter.getFormattedDate(from);
      const toDate = DateFormatter.getFormattedDate(to);
      const queryString = `SELECT vd.VIDEO_ID, vd.VIDEO_TITLE, vd.VIDEO_DESCRIPTION, vd.video_tags, vd.YEAR, vd.MONTH, vd.DAY 
         FROM ${videoCacheTable} vd
         WHERE (vd.video_title LIKE '%${search}%' AND vd.video_tags LIKE '%${related}%')
         AND (vd.video_title LIKE '%${related}%' AND vd.video_tags LIKE '%${search}%')
         AND (
             (vd.YEAR > ${fromDate.year} OR (vd.YEAR = ${fromDate.year} AND vd.MONTH > ${fromDate.month}) OR (vd.YEAR = ${fromDate.year} AND vd.MONTH = ${fromDate.month} AND vd.DAY >= ${fromDate.day}))
             AND 
             (vd.YEAR < ${toDate.year} OR (vd.YEAR = ${toDate.year} AND vd.MONTH < ${toDate.month}) OR (vd.YEAR = ${toDate.year} AND vd.MONTH = ${toDate.month} AND vd.DAY <= ${toDate.day}))
             )`;
      const cache = await this.client.getCache(videoCacheTable);
      const query = new this.SqlFieldsQuery(queryString);
      const result = await cache.query(query);

      return Ok(
        VideosResultTransformer.mapResultToObjects<IVideoSchema>(
          await result.getAll(),
          queryString,
        ),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
