import { z } from 'zod';
import { IQuery } from '@nestjs/cqrs';
import { IKeyword, IPageQuery } from '@dothis/dto';

export interface IFindVideoPageQuery extends IKeyword, IPageQuery {}

export class FindVideoPageQuery implements IQuery {
  readonly clusterNumber: number;
  readonly limit: number;
  readonly search: string;
  readonly related?: string;
  readonly last?: string;
  constructor(props: FindVideoPageQuery) {
    Object.assign(this, props);
  }
}
