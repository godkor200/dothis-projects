import { IPickDateFromLimitLast } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';

export class GetWeeklyViewsQuery implements IPickDateFromLimitLast {
  readonly from: Date;
  readonly limit: number;
  readonly last?: string;
  constructor(props: GetWeeklyViewsQuery) {
    Object.assign(this, props);
  }
}
