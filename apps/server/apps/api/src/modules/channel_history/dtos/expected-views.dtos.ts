import { IQuery } from '@nestjs/cqrs';

export class ExpectedViewsQuery implements IQuery {
  readonly clusterNumber: string;

  readonly keyword: string;

  readonly relationKeyword?: string;

  readonly from: Date;

  readonly to: Date;

  constructor(props: ExpectedViewsQuery) {
    this.clusterNumber = props.clusterNumber;
    this.keyword = props.keyword;
    this.relationKeyword = props.relationKeyword;
    this.from = props.from;
    this.to = props.to;
  }
}

export interface ExpectedViewsDto
  extends Omit<ExpectedViewsQuery, 'clusterNumber'> {}
