import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { GetVideoDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  TRelatedEntireCount,
  VideoOutboundPort,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
const IgniteClient = require('apache-ignite-client');

const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
export class VideoEntireCountAdapter
  extends VideoBaseAdapter
  implements Pick<VideoOutboundPort, 'getRelatedVideosEntireCount'>
{
  async getRelatedVideosEntireCount(
    dao: GetVideoDao,
  ): Promise<TRelatedEntireCount> {
    const { search, related, from, to, clusterNumber } = dao;

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
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
