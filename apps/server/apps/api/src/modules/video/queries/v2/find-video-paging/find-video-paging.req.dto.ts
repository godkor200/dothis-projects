import { z } from 'zod';
import { IQuery } from '@nestjs/cqrs';
import { TPageV2Query } from '@dothis/dto';

export interface IFindVideoPageQuery extends TPageV2Query {}

export class FindVideoPageV2Query implements IQuery {
  readonly clusterNumbers: number[];
  readonly limit: number;
  readonly search: string;
  readonly related?: string;
  readonly last?: string;
  constructor(props: FindVideoPageV2Query) {
    Object.assign(this, props);
  }
}
