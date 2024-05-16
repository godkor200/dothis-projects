import { ChannelHistoryBaseAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.base.adapter';
import {
  ChannelHistoryByChannelIdOutboundPort,
  TChannelHistoryByChannelIdRes,
} from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';

import { Err, Ok } from 'oxide.ts';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ChannelHistoryByChannelIdAdapter
  implements ChannelHistoryByChannelIdOutboundPort
{
  constructor(private readonly igniteService: IgniteService) {}
  /**
   * 채널 아이디로 CHANNEL_SUBSCRIBERS 불러오는 어뎁터,
   * @param ids 채널 아이디
   */
  async execute(ids: string[]): Promise<TChannelHistoryByChannelIdRes> {
    const { year, month, day } = DateUtil.currentDate();
    const cacheName = CacheNameMapper.getChannelHistoryCacheName(year, month);
    const queryString = `
    SELECT DISTINCT ch.channel_id, ch.CHANNEL_SUBSCRIBERS, ch.CHANNEL_AVERAGE_VIEWS,ch.YEAR, ch.MONTH, ch.DAY
    FROM ${cacheName} ch 
    WHERE ch.channel_id IN ('${ids.join(`', '`)}') 
    AND (
    (DAY = ${day})
    OR 
    (DAY = ${
      Number(day) - 1
    } AND NOT EXISTS (SELECT 1 FROM ${cacheName} WHERE DAY = ${day}))
    );`;
    try {
      const query = this.igniteService.createDistributedJoinQuery(queryString);
      const cache = await this.igniteService.getClient().getCache(cacheName);
      const result = await cache.query(query);
      const resArr = await result.getAll();

      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
