import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import {
  TRelatedEntireCount,
  TRelatedVideoAndHistoryRes,
  TRelatedVideos,
  TRelatedVideosCountByDay,
  VideoOutboundPort,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { ConfigService } from '@nestjs/config';
import {
  RelatedVideoAndCountByDayDao,
  RelatedVideoAndVideoHistoryDao,
  SearchRelationVideoDao,
} from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Err, Ok } from 'oxide.ts';
import {
  VideosResultTransformer,
  VideosDateFormatter,
} from '@Apps/modules/video/infrastructure/utils';
import { IVideoSchema } from '@Apps/modules/video/infrastructure/daos/video.res';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
import { GetVideoDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';

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
  private getClusterQueryString(
    columns: string[],
    search: string,
    related: string,
    from: string,
    to: string,
    clusterNumber: string | string[],
  ): string {
    const fromDate = VideosDateFormatter.getFormattedDate(from);
    const toDate = VideosDateFormatter.getFormattedDate(to);
    // clusterNumber가 배열이 아니라면 하나의 요소를 가진 배열로 변환
    const clusterNumbers = Array.isArray(clusterNumber)
      ? clusterNumber
      : [clusterNumber];
    return clusterNumbers
      .map((index) => {
        const tableName = `VIDEO_DATA_CLUSTER_${index}`;
        const joinTableName = `VIDEO_HISTORY_CLUSTER_${index}_${fromDate.year}_${fromDate.month}`;
        return `(SELECT ${columns} FROM DOTHIS.${tableName} vd JOIN DOTHIS.${joinTableName} vh ON vd.video_id = vh.video_id  WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
   AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%') AND vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
      })
      .join(' UNION ');
  }
  async getRelatedVideoAndVideoHistory(
    dao: RelatedVideoAndVideoHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes> {
    const { search, related, from, to, clusterNumber } = dao;

    try {
      const fromDate = VideosDateFormatter.getFormattedDate(from);
      const toDate = VideosDateFormatter.getFormattedDate(to);
      const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${clusterNumber}_${fromDate.year}_${fromDate.month}`;
      const joinTableName = `DOTHIS.VIDEO_DATA_CLUSTER_${clusterNumber}`;

      const cache = await this.client.getCache(tableName);
      const queryString = `SELECT vh.VIDEO_ID, vh.VIDEO_VIEWS, vh.YEAR, vh.MONTH, vh.DAY
       FROM ${tableName} vh JOIN ${joinTableName} vd 
       ON vd.video_id = vh.video_id
       WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
       AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%')
       AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
      const query = new SqlFieldsQuery(queryString);

      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());

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

  async getRelatedVideosCountByDay(
    dao: RelatedVideoAndCountByDayDao,
  ): Promise<TRelatedVideosCountByDay> {
    const { search, related, from, to, clusterNumber } = dao;

    try {
      const fromDate = VideosDateFormatter.getFormattedDate(from);
      const toDate = VideosDateFormatter.getFormattedDate(to);
      const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${clusterNumber}_${fromDate.year}_${fromDate.month}`;
      const joinTableName = `DOTHIS.VIDEO_DATA_CLUSTER_${clusterNumber}`;
      const cache = await this.client.getCache(tableName);
      const queryString = `SELECT vh.DAY, COUNT(DISTINCT vh.VIDEO_ID) AS unique_video_count
       FROM ${tableName} vh JOIN ${joinTableName} vd 
       ON vd.video_id = vh.video_id
       WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%')
       AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%')
       AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})
       GROUP BY vh.DAY;
`;
      const query = new SqlFieldsQuery(queryString);

      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());

      return Ok(
        VideosResultTransformer.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      return Err(e);
    }
  }

  async getRelatedVideosPaginated(dao: GetVideoDao): Promise<TRelatedVideos> {
    const { search, related, from, to, clusterNumber, limit, page } = dao;
    const columns = [
      'VIDEO_ID',
      'CHANNEL_ID',
      'VIDEO_TITLE',
      'VIDEO_DESCRIPTION',
      'VIDEO_TAGS',
      'VIDEO_DURATION',
      'VIDEO_PUBLISHED',
      'VIDEO_CATEGORY',
      'VIDEO_INFO_CARD',
      'VIDEO_WITH_ADS',
      'VIDEO_END_SCREEN',
      'VIDEO_CLUSTER',
      'CRAWLED_DATE',
      'YEAR',
      'MONTH',
      'DAY',
    ];

    const queryString = this.getClusterQueryString(
      columns.map((column) => `vd.${column}`),
      search,
      related,
      from,
      to,
      clusterNumber,
    );
    const clusterNumberValue = Array.isArray(clusterNumber)
      ? clusterNumber[0]
      : clusterNumber;
    const tableName = `DOTHIS.VIDEO_DATA_CLUSTER_${clusterNumberValue}`;
    const pageSize = Number(limit);
    const currentPage = Number(page);
    try {
      const query = new SqlFieldsQuery(
        queryString +
          ` LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize})`,
      );
      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoNotFoundError());
      return Ok(
        VideosResultTransformer.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      return Err(e);
    }
  }

  async getRelatedVideosEntireCount(
    dao: GetVideoDao,
  ): Promise<TRelatedEntireCount> {
    const { search, related, from, to, clusterNumber, limit, page } = dao;

    const queryString = this.getClusterQueryString(
      [`count(*)`],
      search,
      related,
      from,
      to,
      clusterNumber,
    );

    const clusterNumberValue = Array.isArray(clusterNumber)
      ? clusterNumber[0]
      : clusterNumber;
    const tableName = `DOTHIS.VIDEO_DATA_CLUSTER_${clusterNumberValue}`;
    try {
      const query = new SqlFieldsQuery(queryString);
      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoNotFoundError());

      return Ok(resArr);
    } catch (e) {
      return Err(e);
    }
  }
}
