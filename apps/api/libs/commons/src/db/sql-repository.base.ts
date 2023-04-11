import {
  PaginatedQueryParams,
  RepositoryPort,
  updateObject,
} from '@Libs/commons/src/ddd/repository.port';
import { ZodObject } from 'zod';
import { DataSource, Repository } from 'typeorm';
import { IResDto } from '@Libs/commons/src/types/res.types';

export abstract class SqlRepositoryBase<E, M> implements RepositoryPort<E> {
  constructor(private dataSource: DataSource) {}
  protected abstract tableName: string;
  protected abstract schema: ZodObject<any>;
  protected abstract repository: Repository<E>;

  async updateOne(column: updateObject): Promise<IResDto> {
    const res = await this.repository
      .createQueryBuilder()
      .update(this.tableName)
      .set(column)
      .where({ id: column.id })
      .execute();
    return { success: res.raw > 0 };
  }
  async delete(id: string): Promise<boolean> {
    const res = await this.repository
      .createQueryBuilder(this.tableName)
      .delete()
      .from(this.tableName)
      .where({ id })
      .execute();
    return res.raw > 0;
  }

  async findAll(): Promise<E[]> {
    return await this.repository.find();
  }
  //TODO: 오프셋 필요할시 구현 Promise<Paginated<E>>
  async findAllPaginated(params: PaginatedQueryParams): Promise<any> {
    const res = this.repository
      .createQueryBuilder(this.tableName)
      .limit(params.limit)
      .offset(params.offset)
      .getCount();
    // return new Paginated({
    //   data: res,
    //   count: res,
    // });
  }

  async findOneById(id: string): Promise<E> {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .where({ id: id })
      .getOne();
  }

  async insert(entity: E): Promise<IResDto> {
    const res = await this.repository
      .createQueryBuilder(this.tableName)
      .insert()
      .into(this.tableName)
      .values(entity)
      .execute();
    return { success: res.raw > 0 };
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T | void> {
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
