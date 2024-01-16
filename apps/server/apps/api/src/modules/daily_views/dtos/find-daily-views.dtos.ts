import { IQuery } from '@nestjs/cqrs';
import { VIDEO_DATA_KEY } from '@Apps/modules/video/dtos/find-videos.dtos';

export interface IPickDateFromLimitLast
  extends Pick<IDateRange, 'from'>,
    IPageQuery {}

export interface IPageQuery {
  readonly limit: number;
  readonly last?: string;
}
export interface IDateRange {
  readonly from: string;
  readonly to: string;
}

export interface IKeywordSearch {
  readonly keyword: string;
  readonly relationKeyword: string;
}

class BaseQuery implements IQuery, IDateRange, IKeywordSearch {
  readonly clusterNumber: string;
  readonly keyword: string;
  readonly relationKeyword: string;
  readonly from: string;
  readonly to: string;

  constructor(props: BaseQuery) {
    this.clusterNumber = props.clusterNumber;
    this.keyword = props.keyword;
    this.relationKeyword = props.relationKeyword;
    this.from = props.from;
    this.to = props.to;
  }
}

export class FindDailyViewsQuery extends BaseQuery {
  constructor(props: FindDailyViewsQuery) {
    super(props);
  }
}

export interface FindDailyViewsDtos
  extends Omit<FindDailyViewsQuery, 'clusterNumber'> {}

export class FindDailyViewsV3Query extends BaseQuery {
  constructor(props: FindDailyViewsV3Query) {
    super(props);
  }
}
export interface FindDailyViewsV3Dto extends FindDailyViewsV3Query {
  readonly data?: VIDEO_DATA_KEY[];
}
export interface FindDailyViewsV3Params
  extends Omit<FindDailyViewsV3Query, 'clusterNumber'> {}

export interface IIncreaseData {
  date: string;
  increase_views: number;
  increase_likes: number;
  increase_comments: number;
}
