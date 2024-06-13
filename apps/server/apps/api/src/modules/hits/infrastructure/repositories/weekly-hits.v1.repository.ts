import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { WeeklyHitsEntity } from '@Apps/modules/hits/domain/entities/weekly-hits.entity';
import { WeeklyHitsModel, zWeeklyKeywordsListSourceSchema } from '@dothis/dto';
import {
  TFilteredWeeklyHitsRes,
  WeeklyHitsV1OutboundPort,
} from '@Apps/modules/hits/domain/ports/weekly-hits.v1.outbound.port';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';
import { GetSomeWeeklyViewsDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Err, Ok } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { Paginated } from '@Libs/commons/src';

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
    const {
      keywords,
      category,
      from,
      limit,
      page,
      sort = 'ranking',
      order = 'asc',
    } = dao;
    const { year, month, day } = this.parseFrom(from);

    try {
      const queryBuilder = this.repository
        .createQueryBuilder(this.tableName)
        .where(`${this.tableName}.YEAR = :year`, { year })
        .andWhere(`${this.tableName}.MONTH = :month`, { month })
        .andWhere(`${this.tableName}.DAY = :day`, { day })
        .limit(limit)
        .offset((page - 1) * limit);
      // 키워드와 카테고리 조건을 함께 추가할 배열입니다.
      let combinedConditions = [];
      let parameters = {};

      // 키워드 조건
      if (keywords && keywords.length > 0) {
        const keywordConditions = keywords.map((keyword, index) => {
          const key = `keyword${index}`;
          parameters[key] = `%${keyword}%`;
          return `(${this.tableName}.keyword LIKE :${key})`;
        });
        combinedConditions = combinedConditions.concat(keywordConditions);
      }

      // 카테고리 조건
      if (category && category.length > 0) {
        const categoryConditions = category.map((number) => {
          const keyExact = `categoryExact${number}`;
          const keyStart = `categoryStart${number}`;
          const keyEnd = `categoryEnd${number}`;
          const keyMiddle = `categoryMiddle${number}`;
          if (number.toString().length === 1) {
            parameters[keyExact] = `${number}`;
            parameters[keyStart] = `${number}, %`;
            parameters[keyEnd] = `%, ${number}`;
            parameters[keyMiddle] = `%, ${number}, %`;
            return `(${this.tableName}.category LIKE :${keyExact} OR 
              ${this.tableName}.category LIKE :${keyStart} OR 
              ${this.tableName}.category LIKE :${keyEnd} OR 
              ${this.tableName}.category LIKE :${keyMiddle})`;
          } else {
            const keyLike = `categoryLike${number}`;
            parameters[keyLike] = `%${number}%`;
            return `(${this.tableName}.category LIKE :${keyLike})`;
          }
        });
        combinedConditions = combinedConditions.concat(categoryConditions);
      }

      // 키워드와 카테고리 조건을 OR로 결합하여 쿼리 빌더에 추가합니다.
      if (combinedConditions.length > 0) {
        queryBuilder.andWhere(
          `(${combinedConditions.join(' OR ')})`,
          parameters,
        );
      }

      // 정렬
      queryBuilder.orderBy(
        `${this.tableName}.${sort}`,
        order.toUpperCase() as 'ASC' | 'DESC',
      );
      const [data, count] = await queryBuilder.getManyAndCount();

      if (!data.length) return Err(new WeeklyViewsError());
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
