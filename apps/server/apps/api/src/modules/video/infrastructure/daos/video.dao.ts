import { FindAccumulateQuery } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { FindDailyViewsV3Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';

export class FindVideosDao extends FindAccumulateQuery {
  readonly cluster: string;
  constructor(props: FindVideosDao) {
    super(props);
  }
}
export class FindDailyViewsV3Dao extends FindDailyViewsV3Dto {
  constructor(props: FindDailyViewsV3Dao) {
    super(props);
    Object.assign(this, props);
  }
}
export class GetRelatedVideoAndVideoHistory {}
