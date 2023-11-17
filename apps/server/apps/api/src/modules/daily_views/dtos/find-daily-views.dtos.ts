import { IQuery } from '@nestjs/cqrs';

export class FindDailyViewsQuery implements IQuery {
  readonly clusterNumber: string;

  readonly keyword: string;

  readonly relationKeyword: string;

  readonly from: Date;

  readonly to: Date;

  constructor(props: FindDailyViewsQuery) {
    this.clusterNumber = props.clusterNumber;
    this.keyword = props.keyword;
    this.relationKeyword = props.relationKeyword;
    this.from = props.from;
    this.to = props.to;
  }
}

export interface FindDailyViewsDtos
  extends Omit<FindDailyViewsQuery, 'clusterNumber'> {}

export class FindDailyViewsV3Query implements IQuery {
  readonly clusterNumber: string;

  readonly keyword: string;

  readonly relationKeyword: string;

  readonly from: Date;

  readonly to: Date;

  constructor(props: FindDailyViewsV3Query) {
    this.clusterNumber = props.clusterNumber;
    this.keyword = props.keyword;
    this.relationKeyword = props.relationKeyword;
    this.from = props.from;
    this.to = props.to;
  }
}

export interface FindDailyViewsV3Dtos
  extends Omit<FindDailyViewsV3Query, 'clusterNumber'> {}
