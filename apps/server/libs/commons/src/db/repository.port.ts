import { IRes } from '@Libs/types';
import { z } from 'zod';
import { zPaginatedSqlQueryParams } from '@dothis/dto';

export class Paginated<T> {
  readonly count: number;
  readonly limit: number;
  readonly page: number;
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
    this.data = props.data;
  }
}

export type PaginatedQueryParams = z.TypeOf<typeof zPaginatedSqlQueryParams>;

export type updateObject = {
  id: string | number;
  [key: string]: any;
};

export interface RepositoryPort<Entity> {
  insert(entity: Entity): Promise<IRes<void>>;
  updateOne(option: updateObject): Promise<IRes<void>>;
  findOneById(id: string): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findAllPaginated(
    params: PaginatedQueryParams,
    where: any,
    sort: string,
    order: 'ASC' | 'DESC',
  ): Promise<Paginated<Entity>>;
  delete(id: string): Promise<boolean>;
  transaction<T>(handler: () => Promise<T>): Promise<T | void>;
}
