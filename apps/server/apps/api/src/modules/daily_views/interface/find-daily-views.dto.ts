import { IQuery } from '@nestjs/cqrs';

export class FindDailyViewsQuery implements IQuery {
  readonly keyword: string;

  readonly relationKeyword?: string;

  readonly from: Date;

  readonly to: Date;

  constructor(props: FindDailyViewsQuery) {
    this.keyword = props.keyword;
    this.relationKeyword = props.relationKeyword;
    this.from = props.from;
    this.to = props.to;
  }
}
