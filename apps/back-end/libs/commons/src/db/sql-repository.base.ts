import {
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from '@Libs/commons/src/ddd/repository.port';
import { ZodObject } from 'zod';
import { DataSource, Repository } from 'typeorm';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';

export abstract class SqlRepositoryBase<E, M> implements RepositoryPort<E> {
  protected abstract tableName: string;

  protected abstract schema: ZodObject<any>;
  protected readonly repository: Repository<E>;
  protected readonly dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(this['tableName']);
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
    return await this.repository.createQueryBuilder(this.tableName).getMany();
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
      .where({ id })
      .getOne();
  }

  async insert(entity: E): Promise<void> {
    await this.repository
      .createQueryBuilder(this.tableName)
      .insert()
      .into(this.tableName)
      .values(entity)
      .execute();
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T | void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

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
