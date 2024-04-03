import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { WeeklyHitsEntity } from '@Apps/modules/hits/domain/entities/weekly-hits.entity';
import { WeeklyHitsModel, zWeeklyKeywordsListSourceSchema } from '@dothis/dto';
import {
  TFilteredWeeklyHitsRes,
  WeeklyHitsV1OutboundPort,
} from '@Apps/modules/hits/domain/ports/weekly-hits.v1.outbound.port';
import { DataSource, Repository } from 'typeorm';
import { undefined, ZodObject } from 'zod';
import { GetSomeWeeklyViewsDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Err, Ok } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';

export class WeeklyHitsV1Repository
  extends SqlRepositoryBase<WeeklyHitsEntity, WeeklyHitsModel>
  implements WeeklyHitsV1OutboundPort
{
  @InjectRepository(WeeklyHitsEntity)
  protected repository: Repository<WeeklyHitsEntity>;

  protected tableName: string = 'weekly_views';

  protected schema: ZodObject<any> = zWeeklyKeywordsListSourceSchema;
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async filterWeeklyKeywordHits(
    dao: GetSomeWeeklyViewsDao,
  ): Promise<TFilteredWeeklyHitsRes> {
    const { keywords, from, sort = 'ranking', order = 'asc' } = dao;
    const { year, month, day } = this.parseFrom(from);

    try {
      const queryBuilder = this.repository
        .createQueryBuilder(this.tableName)
        .where(`${this.tableName}.YEAR = :year`, { year: Number(year) })
        .andWhere(`${this.tableName}.MONTH = :month`, { month: Number(month) })
        .andWhere(`${this.tableName}.DAY = :day`, { day: Number(day) });

      // keywords 배열에 있는 각 키워드를 검색 조건에 포함
      if (keywords && keywords.length > 0) {
        queryBuilder.andWhere(`${this.tableName}.keyword IN (:...keywords)`, {
          keywords,
        });
      }
      // 정렬
      queryBuilder.orderBy(
        `${this.tableName}.${sort}`,
        order.toUpperCase() as 'ASC' | 'DESC',
      );
      const data = await queryBuilder.getMany();

      if (!data.length) return Err(new WeeklyViewsError());
      return Ok(data);
    } catch (e) {
      return Err(e);
    }
  }
}
