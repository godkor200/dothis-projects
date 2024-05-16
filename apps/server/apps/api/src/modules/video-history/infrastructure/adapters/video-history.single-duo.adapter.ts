import {
  IGetOneVideoHistoryOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IGetVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import {
  DateFormatter,
  DateFormatterRes,
} from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryBaseAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.base.adapter';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { Injectable } from '@nestjs/common';

/**
 * 비디오의 기록을 관리하는 시스템의 일부로, 특정 비디오의 이력을 데이터베이스에서 가져오는 기능을 담당, 비디오 히스토리의 기간내에 전부 가져오는 함수
 */
@Injectable()
export class VideoHistorySingleDuoAdapter
  extends VideoHistoryBaseAdapter
  implements IGetOneVideoHistoryOutboundPort
{
  constructor(private readonly igniteService: IgniteService) {
    super();
  }
  /**
   * 주어진 조건으로 쿼리 문자열을 생성하는 메소드
   * @param keys - 컬럼명
   * @param clusterNumbers - 클러스터 번호 배열
   * @param from - 시작 날짜
   * @param to - 종료 날짜
   * @returns 쿼리 문자열
   */
  private queryString(
    keys: string[],
    clusterNumbers: string,
    videoId: string,
    from: DateFormatterRes,
    to: DateFormatterRes,
  ): string {
    const tableName = CacheNameMapper.getVideoHistoryCacheName(
      clusterNumbers,
      from.year,
      from.month,
    );
    const startDay = from.day;
    const endDay = to.day;
    if (from.year === to.year && from.month === to.month) {
      return `SELECT ${
        'vh.' + keys.join(', vh.')
      } FROM ${tableName} vh WHERE vh.VIDEO_ID = '${videoId}' AND vh.DAY BETWEEN ${startDay} AND ${endDay};`;
    }
    const toTableName = CacheNameMapper.getVideoHistoryCacheName(
      clusterNumbers,
      to.year,
      to.month,
    );

    return `((SELECT ${
      'vh.' + keys.join(', vh.')
    } FROM ${tableName} vh WHERE vh.VIDEO_ID = '${videoId}' AND vh.DAY BETWEEN ${startDay} AND ${31}) UNION (
      SELECT ${
        'vh.' + keys.join(', vh.')
      } FROM ${toTableName} vh WHERE vh.VIDEO_ID = '${videoId}' AND vh.DAY BETWEEN ${1} AND ${endDay}
      ))`;
  }

  async execute(dao: IGetVideoHistoryDao): Promise<TGetVideoHistoryRes> {
    const { videoId, from, to, clusterNumber } = dao;

    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const tableName = CacheNameMapper.getVideoHistoryCacheName(
      clusterNumber,
      fromDate.year,
      fromDate.month,
    );

    const queryString = this.queryString(
      this.keys,
      clusterNumber,
      videoId,
      fromDate,
      toDate,
    );
    try {
      const cache = await this.igniteService.getClient().getCache(tableName);
      const query = this.igniteService.createDistributedJoinQuery(queryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());
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
