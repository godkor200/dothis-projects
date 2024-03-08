import {
  IGetRelatedVideosPaginatedOutBoundPort,
  TRelatedVideos,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { GetVideoDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { undefined } from 'zod';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
const IgniteClient = require('apache-ignite-client');

const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
export class VideoPaginatedAdapter
  extends VideoBaseAdapter
  implements IGetRelatedVideosPaginatedOutBoundPort
{
  async execute(dao: GetVideoDao): Promise<TRelatedVideos> {
    const { search, related, from, to, clusterNumber, limit, page } = dao;

    const queryString = this.getClusterQueryString(
      this.videoColumns.map((column) => `vd.${column}`),
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
      const query = this.createDistributedJoinQuery(
        '(' +
          queryString +
          `) LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize}`,
      );
      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoNotFoundError());
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
