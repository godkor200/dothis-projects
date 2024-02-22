import { EntityManager } from 'typeorm';
import {
  TGetWeeklyHitsCount,
  TPaginatedWeeklyHitsRes,
  WeeklyHitsOutboundPort,
} from '@Apps/modules/hits/domain/ports/weekly-views.outbound.port';

import { Err, Ok } from 'oxide.ts';
import { GetWeeklyViewsDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Injectable } from '@nestjs/common';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';

@Injectable()
export class WeeklyHitsRepository implements WeeklyHitsOutboundPort {
  constructor(private readonly manager: EntityManager) {}
  private parseFrom(from: string): { yearMonth: string; day: number } {
    const yearMonth = from.slice(0, 7).replace('-', ''); // yyyy-mm 형태를 yyyymm 형태로 변환
    const day = parseInt(from.split('-')[2], 10); // 'dd' 형태를 추출하고, 앞의 0을 제거
    return { yearMonth, day };
  }
  async getPaginatedWeeklyHitsByKeyword(
    dao: GetWeeklyViewsDao,
  ): Promise<TPaginatedWeeklyHitsRes> {
    const { from, limit, page, sort = 'ranking', order = 'ASC' } = dao;
    const pageSize = Number(limit);
    const currentPage = Number(page);
    const { yearMonth, day } = this.parseFrom(from);
    const tableName = `weekly_views_${yearMonth}`;
    try {
      const res = await this.manager.query(
        `SELECT * FROM ${tableName} WHERE DAY = ${day} ORDER BY ${sort} ${order} LIMIT ${pageSize} OFFSET ${
          (currentPage - 1) * pageSize
        }`,
      );
      if (!res) {
        return Err(new WeeklyViewsError());
      }
      return Ok(res);
    } catch (e) {
      return Err(e);
    }
  }

  async getWeeklyHitsCount(
    dao: GetWeeklyViewsDao,
  ): Promise<TGetWeeklyHitsCount> {
    const { from } = dao;
    const { yearMonth, day } = this.parseFrom(from);
    const tableName = `weekly_views_${yearMonth}`;

    try {
      const res = await this.manager.query(
        `SELECT count(*) FROM ${tableName} WHERE DAY = ${day} 
        `,
      );

      if (!res[0] && !('count(*)' in res[0])) {
        return Err(new WeeklyViewsError());
      }
      return Ok(Number(res[0]['count(*)']));
    } catch (e) {
      return Err(e);
    }
  }
}
