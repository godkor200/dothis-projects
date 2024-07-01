import {
  FindDailyViewsV1Query,
  FindDailyViewsV3Dto,
} from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';

export class FindDailyViewsV1Dto {
  constructor(public readonly dto: FindDailyViewsV3Dto) {}
}
export class FindDailyViewsV2Dto extends FindDailyViewsV1Query {
  constructor(props: FindDailyViewsV2Dto) {
    super(props);
    Object.assign(this, props);
  }
}
