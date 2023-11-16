import { IQuery } from '@nestjs/cqrs';

export enum CHANNEL_DATA_KEY {
  'CHANNEL_ID' = 'channel_id',
  'CHANNEL_SEUBSCRIBERS' = 'channel_subscribers',
  'CHANNEL_TOTAL_VIEWS' = 'channel_total_views',
  'CHANNEL_TOTAL_VIDEOS' = 'channel_total_videos',
  'CHANNEL_AVERAGE_VIEWS' = 'channel_average_views',
  'CRAWLED_DATE' = 'crawled_date',
}

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

export class ExpectedViewsV2Query implements IQuery {
  readonly clusterNumber: string;

  readonly keyword: string;

  readonly relationKeyword?: string;

  readonly from: Date;

  readonly to: Date;

  constructor(props: ExpectedViewsV2Query) {
    this.clusterNumber = props.clusterNumber;
    this.keyword = props.keyword;
    this.relationKeyword = props.relationKeyword;
    this.from = props.from;
    this.to = props.to;
  }
}

export interface ExpectedViewsV2Dto
  extends Omit<ExpectedViewsV2Query, 'clusterNumber'> {}
