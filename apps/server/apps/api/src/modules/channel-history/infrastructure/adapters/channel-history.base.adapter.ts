import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';
import { Err, Ok } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { TChannelHistoryTuplesRes } from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { FindIndividualVideoInfoV1Dao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';

export class ChannelHistoryBaseAdapter
  extends IgniteService
  implements ChannelHistoryOutboundPort
{
  protected readonly keys: string[] = [
    'CHANNEL_ID',
    'CHANNEL_AVERAGE_VIEWS',
    'CHANNEL_SUBSCRIBERS',
    'CHANNEL_TOTAL_VIEWS',
    'CHANNEL_TOTAL_VIDEOS',
    'YEAR',
    'MONTH',
    'DAY',
  ];

  protected async history(
    tableName: string,
    queryString: string,
  ): Promise<Ok<any[]> | Err<any>> {
    try {
      const query = this.createDistributedJoinQuery(queryString);

      const cache = await this.client.getCache(tableName);

      const result = await cache.query(query);
      const res = await result.getAll();
      if (!res.length) {
        return Err(new ChannelHistoryNotFoundError());
      }
      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(res, queryString),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }

  /**
   * 히스토리 전부를 가져오는 어뎁터
   * FIXME: 모듈화 필요
   * @param dao
   */
  async getHistory(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryTuplesRes> {
    const { clusterNumber, videoId } = dao;
    const { year, month } = DateUtil.currentDate();
    const tableName = CacheNameMapper.getChannelHistoryCacheName(year, month);
    const joinTableName = CacheNameMapper.getVideoDataCacheName(clusterNumber);
    const queryString = `SELECT ch.${this.keys.join(
      ', ch.',
    )}, vd.video_tags FROM ${tableName} ch JOIN ${joinTableName} vd ON ch.channel_id = vd.channel_id WHERE vd.video_id = '${videoId}'`;
    return await this.history(tableName, queryString);
  }
}
