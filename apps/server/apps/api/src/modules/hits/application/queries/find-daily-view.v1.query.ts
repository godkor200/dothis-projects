import { FindDailyViewsV3Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';

export class FindDailyViewsV1Query {
  constructor(public readonly dto: FindDailyViewsV3Dto) {}
}
