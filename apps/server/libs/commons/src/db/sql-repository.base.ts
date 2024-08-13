import {
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
  updateObject,
} from '@Libs/commons/src/ddd/repository.port';
import { ZodObject } from 'zod';
import { DataSource, Repository } from 'typeorm';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';

export abstract class SqlRepositoryBase<E, M> implements RepositoryPort<E> {
  protected constructor(private dataSource: DataSource) {}
  protected abstract tableName: string;
  protected abstract schema: ZodObject<any>;
  protected abstract repository: Repository<E>;
  public parseFrom(from: string): {
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
  async updateOne(params: updateObject): Promise<IRes<void>> {
    const res = await this.repository
      .createQueryBuilder()
      .update(this.tableName)
      .set(params)
      .where({ id: params.id })
      .execute();
    return { success: res.affected > 0 };
  }
  async delete(id: string): Promise<boolean> {
    const res = await this.repository
      .createQueryBuilder(this.tableName)
      .delete()
      .from(this.tableName)
      .where({ id })
      .execute();
    return res.affected > 0;
  }

  async findAll(): Promise<E[]> {
    return await this.repository.find();
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
    where: any,
    sort: string,
    order: 'ASC' | 'DESC',
  ): Promise<Paginated<E>> {
    try {
      // params.page가 정의되지 않으면 1로 기본값 설정
      const pageNumber = params.page ? Number(params.page) : 1;
      const limitNumber = Number(params.limit);
      const offsetNumber = (pageNumber - 1) * limitNumber;

      const [data, count] = await this.repository
        .createQueryBuilder(this.tableName)
        .where({ ...where })
        .limit(limitNumber)
        .offset(offsetNumber)
        .getManyAndCount();

      return new Paginated({
        count,
        limit: limitNumber,
        page: pageNumber,
        data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async findOneById(id: string): Promise<E> {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .where({ id: id })
      .getOne();
  }

  async insert(entity: E): Promise<IRes<void>> {
    const res = await this.repository
      .createQueryBuilder(this.tableName)
      .insert()
      .into(this.tableName)
      .values(entity)
      .execute();

    return { success: res.raw['affectedRows'] > 0 };
  }

  /**
   * start a global transaction to save
   * results of all events handlers in one operation
   */
  public async transaction<T>(handler: () => Promise<T>): Promise<T | void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await handler();
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
