import { IQuery } from '@nestjs/cqrs';
import { VIDEO_DATA_KEY } from '@Apps/modules/video/application/dtos/find-videos.dtos';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  findVideoBySearchKeyword,
  zClusterNumber,
  zClusterNumberMulti,
} from '@dothis/dto';

export class ClusterNumberMulti extends createZodDto(
  extendApi(zClusterNumberMulti),
) {}
export class ClusterNumber extends createZodDto(extendApi(zClusterNumber)) {}
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

export interface FindDailyViewsDto
  extends Omit<FindDailyViewsQuery, 'clusterNumber'> {}

export class FindDailyViewsV1Query extends createZodDto(
  extendApi(findVideoBySearchKeyword),
) {
  constructor(props: FindDailyViewsV1Query) {
    super();
  }
}
export class FindDailyViewsV3Dto extends createZodDto(
  extendApi(findVideoBySearchKeyword),
) {
  readonly clusterNumber: string;
  readonly data?: VIDEO_DATA_KEY[];
  constructor(props: FindDailyViewsV3Dto) {
    super();
    Object.assign(this, props);
  }
}
export class FindDailyViewsV1Dto
  implements Omit<FindDailyViewsV3Dto, 'clusterNumber'>
{
  constructor(props: FindDailyViewsV1Dto) {
    Object.assign(this, props);
  }
}

export interface IIncreaseData {
  date: string;
  increaseViews: number;
  increaseLikes: number;
  increaseComments: number;
}
