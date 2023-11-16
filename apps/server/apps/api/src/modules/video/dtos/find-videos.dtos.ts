import { IQuery } from '@nestjs/cqrs';

export enum VIDEO_DATA_KEY {
  VIDEO_ID = 'video_id',
  CHANNEL_ID = 'channel_id',
  VIDEO_TITLE = 'video_title',
  VIDEO_URL = 'video_url',
  VIDEO_DESCRIPTION = 'video_description',
  VIDEO_DURATION = 'video_duration',
  VIDEO_PUBLISHED = 'video_published',
  VIDEO_TAG = 'video_tag',
  VIDEO_CATEGORY = 'video_category',
  VIDEO_INFO_CARD = 'video_info_card',
  VIDEO_WITH_ADS = 'video_with_ads',
  VIDEO_END_SCREEN = 'video_end_screen',
  CRAWLED_DATE = 'crawled_date',
  VIDEO_CLUSTER = 'video_cluster',
  VIDEO_HISTORY = 'video_history',
}

export class FindVideoDateQuery implements IQuery {
  readonly clusterNumber: string;

  readonly keyword: string;

  readonly relationKeyword?: string;

  readonly from: Date;

  readonly to: Date;

  readonly data?: VIDEO_DATA_KEY[];

  constructor(props: FindVideoDateQuery) {
    this.clusterNumber = props.clusterNumber;
    this.keyword = props.keyword;
    this.relationKeyword = props.relationKeyword;
    this.from = props.from;
    this.to = props.to;
    this.data = props.data;
  }
}

export interface FindDailyViewsDtos
  extends Omit<FindVideoDateQuery, 'clusterNumber'> {}
