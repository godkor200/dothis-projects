import {
  TGetWeeklyKeywords,
  TOneKeywordRes,
  TPaginatedWeeklyHitsV2Res,
  WeeklyHitsV2OutboundPort,
} from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import {
  GetWeeklyKeyword,
  GetWeeklyViewsDaoV2,
} from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { WeeklyHitsEntity } from '@Apps/modules/hits/domain/entities/weekly-hits.entity';
import { WeeklyHitsModel, zWeeklyKeywordsListSourceSchema } from '@dothis/dto';
import { ZodObject } from 'zod';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Err, Ok } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { Paginated } from '@Libs/commons';
import { SqlRepositoryBase } from '@Libs/commons/db/sql-repository.base';

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
  async getKeyword(keyword: string): Promise<TOneKeywordRes> {
    try {
      const queryBuilder = this.repository
        .createQueryBuilder('wv')
        .select('wv.ranking', 'ranking')
        .addSelect('wv.category', 'category')
        .addSelect('wv.competitive', 'competitive')
        .addSelect('wv.last_ranking', 'lastRanking')
        .where({ keyword: keyword })
        .addSelect('wv.year', 'year')
        .addSelect('wv.month', 'month')
        .addSelect('wv.day', 'day')
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('subWv.year, subWv.month, subWv.day')
            .from('weekly_views', 'subWv')
            .orderBy('subWv.year', 'DESC')
            .addOrderBy('subWv.month', 'DESC')
            .addOrderBy('subWv.day', 'DESC')
            .limit(1)
            .getQuery();
          return '(wv.year, wv.month, wv.day) = (' + subQuery + ')';
        });
      const results = await queryBuilder.getRawMany();
      if (!results.length) return Err(new WeeklyViewsError());
      return Ok(results[0]);
    } catch (error) {
      return Err(error);
    }
  }
  async getPaginatedWeeklyHitsByKeywordAndCount(
    dao: GetWeeklyViewsDaoV2,
  ): Promise<TPaginatedWeeklyHitsV2Res> {
    try {
      const {
        from,
        limit,
        category,
        page = 1,
        sort = 'ranking',
        order = 'asc',
        keywords,
      } = dao;

      const { year, month, day } = this.parseFrom(from);

      // 페이지 번호가 유효하지 않거나 정의되지 않았다면 기본값을 설정
      const parsedPage =
        !isNaN(Number(page)) && Number(page) > 0 ? Number(page) : 1;
      const offset = (parsedPage - 1) * Number(limit);
      const sortField = Array.isArray(sort) ? sort[0] : sort;
      // 쿼리 빌더 생성
      const queryBuilder = this.repository
        .createQueryBuilder(this.tableName)
        .where(`${this.tableName}.YEAR = :year`, { year: Number(year) })
        .andWhere(`${this.tableName}.MONTH = :month`, { month: Number(month) })
        .andWhere(`${this.tableName}.DAY = :day`, { day: Number(day) })
        .limit(Number(limit))
        .offset(offset);
      // category 배열을 순회하여 각 요소에 대해 LIKE 조건 추가
      if (Array.isArray(category) && category.length > 0) {
        const categoryConditions = category
          .map(
            (cat, index) => `${this.tableName}.category LIKE :category${index}`,
          )
          .join(' OR ');
        queryBuilder.andWhere(
          `(${categoryConditions})`,
          Object.fromEntries(
            category.map((cat, index) => [`category${index}`, `${cat}%`]),
          ),
        );
      }
      if (Array.isArray(keywords) && keywords.length > 0) {
        // Create the IN condition
        queryBuilder.andWhere(
          `${this.tableName}.keyword IN (:...keywords)`,
          { keywords: keywords.map((cat) => `${cat}`) }, // Array of keywords with wildcard
        );
      }

      // orderBy 적용
      if (sortField && order) {
        // 기본 정렬 필드 확인
        const fieldValue =
          typeof sortField === 'boolean' ? 'ranking' : sortField;
        // 정렬 실행
        queryBuilder.orderBy(fieldValue, order.toUpperCase() as 'ASC' | 'DESC');
      }
      console.log(queryBuilder);
      // 데이터 가져오기
      const [data, count] = await queryBuilder.getManyAndCount();

      if (count === 0) return Err(new WeeklyViewsError()); // 결과가 없는 경우

      return Ok(
        new Paginated<WeeklyHitsEntity>({
          count,
          data,
          limit: Number(limit), // 요청한 limit 값
          page: Number(page), // 페이지 번호
        }),
      );
    } catch (e) {
      return Err(e);
    }
  }

  async getWeeklyKeywords(dao: GetWeeklyKeyword): Promise<TGetWeeklyKeywords> {
    const limitViews: number = 5000000; // 조회수 제한 500만

    try {
      const queryBuilder = this.repository
        .createQueryBuilder('wv')
        .select('wv.keyword', 'recommendedKeyword')
        .addSelect('wv.ranking', 'ranking')
        .addSelect('wv.category', 'topCategoryNumber')
        .addSelect('wv.year', 'year')
        .addSelect('wv.month', 'month')
        .addSelect('wv.day', 'day')
        .addSelect('rw.rel_words', 'topAssociatedWord')
        .addSelect('wv.last_ranking - wv.ranking', 'changes') // changes 컬럼 추가
        .leftJoin('related_words', 'rw', 'wv.keyword = rw.keyword')
        .where((qb) => {
          const subQuery = qb
            .subQuery()
            .select('subWv.year, subWv.month, subWv.day')
            .from('weekly_views', 'subWv')
            .orderBy('subWv.year', 'DESC')
            .addOrderBy('subWv.month', 'DESC')
            .addOrderBy('subWv.day', 'DESC')
            .limit(1)
            .getQuery();
          return '(wv.year, wv.month, wv.day) = (' + subQuery + ')';
        })
        .andWhere('wv.weekly_views >= :limit', { limit: limitViews })
        .orderBy('changes', 'DESC') // changes 기준 정렬
        .limit(Number(dao.limit));

      const results = await queryBuilder.getRawMany();

      if (!results.length) return Err(new WeeklyViewsError());
      return Ok(results);
    } catch (e) {
      return Err(e);
    }
  }
}
