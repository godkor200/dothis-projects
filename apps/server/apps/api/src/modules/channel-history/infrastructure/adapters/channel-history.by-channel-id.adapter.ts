import {
  ChannelHistoryByChannelIdOutboundPort,
  TChannelHistoryByChannelIdRes,
} from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';

import { Err, Ok } from 'oxide.ts';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import {
  DateFormatter,
  IgniteResultToObjectMapper,
} from '@Apps/common/ignite/mapper';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { Injectable } from '@nestjs/common';
import { GetChannelHistoryByChannelIdV2Dao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { DateUtil } from '@Libs/commons/src/utils/date.util';

@Injectable()
export class ChannelHistoryByChannelIdAdapter
  implements ChannelHistoryByChannelIdOutboundPort
{
  constructor(private readonly igniteService: IgniteService) {}

  /**
   * 채널 아이디로 CHANNEL_SUBSCRIBERS 불러오는 어댑터,
   * @param dao 데이터 접근 객체
   */
  async execute(
    dao: GetChannelHistoryByChannelIdV2Dao,
  ): Promise<TChannelHistoryByChannelIdRes> {
    let queryString = '';
    let fromCacheName = '';

    if (dao.from && dao.to) {
      const { from, to } = dao;

      const fromDate = DateFormatter.getFormattedDate(from);
      const toDate = DateFormatter.getFormattedDate(to);
      const { year: fromYear, month: fromMonth, day: fromDay } = fromDate;
      const { year: toYear, month: toMonth, day: toDay } = toDate;

      if (fromYear === toYear && fromMonth === toMonth) {
        // 같은 경우는 한 개의 채널 히스토리만 검색
        fromCacheName = CacheNameMapper.getChannelHistoryCacheName(
          fromYear,
          fromMonth,
        );
        queryString = `
          SELECT DISTINCT ch.channel_id, ch.CHANNEL_SUBSCRIBERS, ch.CHANNEL_AVERAGE_VIEWS, ch.YEAR, ch.MONTH, ch.DAY
          FROM ${fromCacheName} ch 
          WHERE ch.channel_id IN ('${dao.channelIds.join(`', '`)}') 
          AND ch.day BETWEEN '${fromDate.day}' AND '${toDate.day}'`;
      } else {
        // 날짜가 한 달 이상 차이나거나 년도가 바뀌는 경우, 여러 테이블을 검색
        fromCacheName = CacheNameMapper.getChannelHistoryCacheName(
          fromYear,
          fromMonth,
        );
        const toCacheName = CacheNameMapper.getChannelHistoryCacheName(
          toYear,
          toMonth,
        );

        queryString = `
          SELECT DISTINCT ch.channel_id, ch.CHANNEL_SUBSCRIBERS, ch.CHANNEL_AVERAGE_VIEWS, ch.YEAR, ch.MONTH, ch.DAY
          FROM ${fromCacheName} ch 
          WHERE ch.channel_id IN ('${dao.channelIds.join(`', '`)}') 
          AND ch.day BETWEEN '${fromDay}' AND '31'
          UNION ALL
          SELECT DISTINCT ch.channel_id, ch.CHANNEL_SUBSCRIBERS, ch.CHANNEL_AVERAGE_VIEWS, ch.YEAR, ch.MONTH, ch.DAY
          FROM ${toCacheName} ch 
          WHERE ch.channel_id IN ('${dao.channelIds.join(`', '`)}') 
          AND ch.day BETWEEN '1' AND '${toDay}'`;
      }
    } else {
      // from, to 둘 다 없을 경우 최신 일자를 쿼리
      const { year, month } = DateUtil.currentDate();
      fromCacheName = CacheNameMapper.getChannelHistoryCacheName(year, month);
      queryString = `
        SELECT DISTINCT ch.channel_id, ch.CHANNEL_SUBSCRIBERS, ch.CHANNEL_AVERAGE_VIEWS, ch.YEAR, ch.MONTH, ch.DAY
        FROM ${fromCacheName} ch 
        WHERE ch.channel_id IN ('${dao.channelIds.join(`', '`)}') 
        AND ch.day = (SELECT MAX(ch2.day) FROM ${fromCacheName} ch2)`;
    }

    try {
      const query = this.igniteService.createDistributedJoinQuery(queryString);
      const cache = await this.igniteService
        .getClient()
        .getCache(fromCacheName);
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
