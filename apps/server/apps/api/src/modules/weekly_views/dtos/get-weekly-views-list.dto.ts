import { IDateRange } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';

export class GetWeeklyViewsQuery implements IDateRange {
  readonly from: Date;
  readonly to: Date;
  readonly last: string;
  constructor(props: GetWeeklyViewsQuery) {
    this.from = props.from;
    this.to = props.to;
    this.last = props.last;
  }
}
