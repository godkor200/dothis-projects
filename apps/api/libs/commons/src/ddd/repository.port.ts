import { IResDto } from '@Libs/commons/src/types/res.types';
import { type } from 'os';

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
export type OrderBy = { field: string | true; param: 'asc' | 'desc' };

export type PaginatedQueryParams = {
  limit: number;
  page: number;
  offset: number;
  orderBy: OrderBy;
};

export type updateObject = {
  id: string;
  [key: string]: any;
};

export interface RepositoryPort<Entity> {
  insert(entity: Entity): Promise<IResDto>;
  updateOne(option: updateObject): Promise<IResDto>;
  findOneById(id: string): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Entity>>;
  delete(id: string): Promise<boolean>;
  transaction<T>(handler: () => Promise<T>): Promise<T | void>;
}
