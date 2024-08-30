import { FindDailyViewsV1Query } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';

export class FindDailyViewsDto extends FindDailyViewsV1Query {
  constructor(props: FindDailyViewsDto) {
    super(props);
    Object.assign(this, props);
  }
}
