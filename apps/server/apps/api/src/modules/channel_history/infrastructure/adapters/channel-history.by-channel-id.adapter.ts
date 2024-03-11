import { ChannelHistoryBaseAdapter } from '@Apps/modules/channel_history/infrastructure/adapters/channel-history.base.adapter';
import {
  ChannelHistoryByChannelIdOutboundPort,
  TChannelHistoryByChannelIdRes,
} from '@Apps/modules/channel_history/domain/ports/channel-history.outbound.port';

import { Err, Ok } from 'oxide.ts';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';

export class ChannelHistoryByChannelIdAdapter
  extends ChannelHistoryBaseAdapter
  implements ChannelHistoryByChannelIdOutboundPort
{
  /**
   * 채널 아이디로 CHANNEL_SUBSCRIBERS 불러오는 레포지토리,
   * 현재 데이터에 따라서 최신날짜를 2월 26일로 임시수정
   * @param ids
   */
  async execute(ids: string[]): Promise<TChannelHistoryByChannelIdRes> {
    const tableName = `dothis.CHANNEL_HISTORY`;
    const queryString = `SELECT DISTINCT ch.channel_id, ch.CHANNEL_SUBSCRIBERS, ch.YEAR, ch.MONTH, ch.DAY
    FROM ${tableName} ch WHERE ch.channel_id IN ('${ids.join(`', '`)}') AND (
    (YEAR = 2024 AND MONTH = 2 AND DAY = 26)
    OR 
    (YEAR = 2024 AND MONTH = 2 AND DAY = 25 AND NOT EXISTS (SELECT 1 FROM DOTHIS.CHANNEL_HISTORY WHERE YEAR = 2024 AND MONTH = 2 AND DAY = 26))
    );`;
    try {
      const query = this.createDistributedJoinQuery(queryString);
      const cache = await this.client.getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
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
