import {
  TPaginatedWeeklyHitsV2Res,
  WeeklyHitsV2OutboundPort,
} from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { GetWeeklyViewsDaoV2 } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { WeeklyHitsEntity } from '@Apps/modules/hits/domain/entities/weekly-hits.entity';
import { WeeklyHitsModel, zWeeklyKeywordsListSourceSchema } from '@dothis/dto';
import { ZodObject } from 'zod';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Err, Ok } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { Paginated } from '@Libs/commons/src';

export class WeeklyHitsV2Repository
  extends SqlRepositoryBase<WeeklyHitsEntity, WeeklyHitsModel>
  implements WeeklyHitsV2OutboundPort
{
  @InjectRepository(WeeklyHitsEntity)
  protected repository: Repository<WeeklyHitsEntity>;

  protected tableName: string = 'weekly_views';

  protected schema: ZodObject<any> = zWeeklyKeywordsListSourceSchema;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
  private parseFrom(from: string): {
    year: number;
    month: number;
    day: number;
  } {
    const dateParts = from.split('-').map((part) => parseInt(part, 10));
    return {
      year: dateParts[0],
      month: dateParts[1],
      day: dateParts[2],
    };
  }
  async getPaginatedWeeklyHitsByKeywordAndCount(
    dao: GetWeeklyViewsDaoV2,
  ): Promise<TPaginatedWeeklyHitsV2Res> {
    try {
      const { from, limit, page, field = 'ranking', order = 'asc' } = dao;
      const { year, month, day } = this.parseFrom(from);

      const queryBuilder = this.repository
        .createQueryBuilder(this.tableName)
        .where(`${this.tableName}.YEAR = :year`, { year: Number(year) })
        .andWhere(`${this.tableName}.MONTH = :month`, { month: Number(month) })
        .andWhere(`${this.tableName}.DAY = :day`, { day: Number(day) })
        .limit(Number(limit))
        .offset((Number(page) - 1) * Number(limit));

      // orderBy 적용
      if (field && order) {
        const fieldValue = typeof field === 'boolean' ? 'id' : field; // `true`일 경우 'id'로 대체
        queryBuilder.orderBy(fieldValue, order.toUpperCase() as 'ASC' | 'DESC');
      }
      const [data, count] = await queryBuilder.getManyAndCount();
      if (!count) return Err(new WeeklyViewsError());

      return Ok(
        new Paginated<WeeklyHitsEntity>({
          count,
          data,
          limit,
          page,
        }),
      );
    } catch (e) {
      return Err(e);
    }
  }
}
