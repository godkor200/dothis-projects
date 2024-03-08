import { IQuery } from '@nestjs/cqrs';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zFindVideoBySearchKeyword } from '@dothis/dto';

export enum CHANNEL_DATA_KEY {
  'CHANNEL_ID' = 'channel_id',
  'CHANNEL_SEUBSCRIBERS' = 'channel_subscribers',
  'CHANNEL_TOTAL_VIEWS' = 'channel_total_views',
  'CHANNEL_TOTAL_VIDEOS' = 'channel_total_videos',
  'CHANNEL_AVERAGE_VIEWS' = 'channel_average_views',
  'CRAWLED_DATE' = 'crawled_date',
  'VIDEO_LIST' = 'video_list',
}

export class ExpectedViewsQuery implements IQuery {
  readonly clusterNumber: string;

  readonly keyword: string;

  readonly relationKeyword: string;

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

export class ExpectedViewsV1Query
  extends createZodDto(extendApi(zFindVideoBySearchKeyword))
  implements IQuery
{
  constructor(props: ExpectedViewsV1Query) {
    super();
  }
}

export class ExpectedViewsV1Dto extends ExpectedViewsV1Query {
  readonly clusterNumber: string | string[];

  constructor(props: ExpectedViewsV1Dto) {
    super(props);
    Object.assign(this, props);
    if (typeof props.clusterNumber === 'string') {
      this.clusterNumber = props.clusterNumber.includes(',')
        ? props.clusterNumber.split(',')
        : props.clusterNumber;
    }
  }
}
