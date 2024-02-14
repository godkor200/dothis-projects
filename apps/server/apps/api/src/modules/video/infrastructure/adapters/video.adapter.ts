import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import {
  TRelatedVideoAndHistoryRes,
  TRelatedVideos,
  VideoOutboundPort,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { ConfigService } from '@nestjs/config';
import {
  RelatedVideoAndVideoHistoryDao,
  SearchRelationVideoDao,
} from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Err, Ok } from 'oxide.ts';
import {
  VideosResultTransformer,
  VideosDateFormatter,
} from '@Apps/modules/video/infrastructure/utils';
import { IVideoSchema } from '@Apps/modules/video/infrastructure/daos/video.res';

const IgniteClient = require('apache-ignite-client');

const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
export class VideoAdapter extends IgniteService implements VideoOutboundPort {
  constructor(configService: ConfigService) {
    super(configService);
  }

  async onModuleInit(): Promise<void> {
    // 부모 클래스의 onModuleInit 호출
    await super.onModuleInit();

    // 추가적인 초기화 로직을 여기에 작성합니다.
    this.logger.log('ChildIgniteConfigService has been initialized.');
  }

  async getRelatedVideoAndVideoHistory(
    dao: RelatedVideoAndVideoHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes> {
    const { search, related, from, to, clusterNumber } = dao;

    try {
      const fromDate = VideosDateFormatter.getFormattedDate(from);
      const toDate = VideosDateFormatter.getFormattedDate(to);
      const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${clusterNumber}_${fromDate.year}_${fromDate.month}`;
      const cache = await this.client.getCache(tableName);
      const queryString = `SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, vh.YEAR, vh.MONTH, vh.DAY 
       FROM ${tableName} vh JOIN DOTHIS.VIDEO_DATA vd 
       ON vd.video_id = vh.video_id
       WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
       AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%')
       AND ((vd.YEAR > ${fromDate.year} OR (vd.YEAR = ${fromDate.year} AND vd.MONTH > ${fromDate.month}) OR (vd.YEAR = ${fromDate.year} AND vd.MONTH = ${fromDate.month} AND vd.DAY >= ${fromDate.day})))
       AND ((vd.YEAR < ${toDate.year} OR (vd.YEAR = ${toDate.year} AND vd.MONTH < ${toDate.month}) OR (vd.YEAR = ${toDate.year} AND vd.MONTH = ${toDate.month} AND vd.DAY <= ${toDate.day})))`;
      const query = new SqlFieldsQuery(queryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      return Ok(
        VideosResultTransformer.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      return Err(e);
    }
  }

  async getRelatedVideos(dao: SearchRelationVideoDao): Promise<TRelatedVideos> {
    const { search, related, from, to } = dao;

    try {
      const cache = await this.client.getCache('dothis.VIDEO_DATA');
      const fromDate = VideosDateFormatter.getFormattedDate(from);
      const toDate = VideosDateFormatter.getFormattedDate(to);
      const queryString = `SELECT vd.VIDEO_ID, vd.VIDEO_TITLE, vd.VIDEO_DESCRIPTION, vd.video_tags, vd.YEAR, vd.MONTH, vd.DAY FROM DOTHIS.VIDEO_DATA vd
         WHERE (vd.video_title LIKE '%${search}%' AND vd.video_tags LIKE '%${related}%')
         AND (vd.video_title LIKE '%${related}%' AND vd.video_tags LIKE '%${search}%')
         AND (
             (vd.YEAR > ${fromDate.year} OR (vd.YEAR = ${fromDate.year} AND vd.MONTH > ${fromDate.month}) OR (vd.YEAR = ${fromDate.year} AND vd.MONTH = ${fromDate.month} AND vd.DAY >= ${fromDate.day}))
             AND 
             (vd.YEAR < ${toDate.year} OR (vd.YEAR = ${toDate.year} AND vd.MONTH < ${toDate.month}) OR (vd.YEAR = ${toDate.year} AND vd.MONTH = ${toDate.month} AND vd.DAY <= ${toDate.day}))
             )`;
      const query = new SqlFieldsQuery(queryString);
      const result = await cache.query(query);

      return Ok(
        VideosResultTransformer.mapResultToObjects<IVideoSchema>(
          await result.getAll(),
          queryString,
        ),
      );
    } catch (e) {
      return Err(e);
    }
  }
}
