import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/infrastructure/repositories/database/channel-history.outbound.port';

import { IChannelHistoryRes } from '@Apps/modules/channel_history/application/dtos/expected-views.res';

import { Err, Ok } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import {
  FindChannelInfoDao,
  TChannelHistoryLatestDayTupleRes,
  TChannelHistoryTuplesRes,
} from '@Apps/modules/channel_history/infrastructure/daos/channel-history.dao';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
import { FindIndividualVideoInfoV1Dao } from '@Apps/modules/video/infrastructure/daos/video.dao';

const IgniteClient = require('apache-ignite-client');

const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;

export class ChannelHistoryAdapter
  extends IgniteService
  implements ChannelHistoryOutboundPort
{
  findChannelHistoryInfo(dao: FindChannelInfoDao): Promise<any> {
    throw new Error('Method not implemented.');
  }
  scanLatestChannelHistoryByKeywordAndRelWord<T>(dao: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  findChannelHistoryByKeywordAndRelWordFullScan<T>(dao: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  private readonly keys: string[] = [
    'CHANNEL_ID',
    'CHANNEL_AVERAGE_VIEWS',
    'CHANNEL_SUBSCRIBERS',
    'CHANNEL_TOTAL_VIEWS',
    'CHANNEL_TOTAL_VIDEOS',
    'YEAR',
    'MONTH',
    'DAY',
  ];

  private async history(
    tableName: string,
    queryString: string,
  ): Promise<Ok<any[]> | Err<any>> {
    try {
      const query = new SqlFieldsQuery(queryString).setDistributedJoins(true);

      const cache = await this.client.getCache(tableName);

      const result = await cache.query(query);
      const res = await result.getAll();
      if (!res.length) {
        return Err(new ChannelHistoryNotFoundError());
      }
      return Ok(VideosResultTransformer.mapResultToObjects(res, queryString));
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }

  findChannelHistoryByLimit(
    channelIds: string[],
    size: number,
    order: 'desc' | 'asc',
  ): Promise<IChannelHistoryRes[]> {
    return Promise.resolve([]);
  }

  async getLatestDayTuple(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryTuplesRes> {
    const { clusterNumber, videoId } = dao;
    const tableName = `dothis.CHANNEL_HISTORY`;
    const joinTableName = `dothis.video_data_cluster_${clusterNumber}`;
    const queryString = `SELECT ch.${this.keys.join(
      ', ch.',
    )}, vd.video_tags, vd.video_published FROM ${tableName} ch JOIN ${joinTableName} vd ON ch.channel_id = vd.channel_id WHERE vd.video_id = '${videoId}' ORDER BY ch.day DESC LIMIT 1`;
    return await this.history(tableName, queryString);
  }

  async getHistory(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryTuplesRes> {
    const { clusterNumber, videoId } = dao;
    const tableName = `dothis.CHANNEL_HISTORY`;
    const joinTableName = `dothis.video_data_cluster_${clusterNumber}`;
    const queryString = `SELECT ch.${this.keys.join(
      ', ch.',
    )}, vd.video_tags FROM ${tableName} ch JOIN ${joinTableName} vd ON ch.channel_id = vd.channel_id WHERE vd.video_id = '${videoId}'`;
    return await this.history(tableName, queryString);
  }
}
