import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/application/dtos/expected-views.dtos';

export class FindVideoChannelHistory {
  readonly keyword: string;

  readonly relationKeyword: string;

  readonly from?: Date;

  readonly to?: Date;

  readonly data?: CHANNEL_DATA_KEY[];

  constructor(props: FindVideoChannelHistory) {
    this.keyword = props.keyword;
    this.relationKeyword = props.relationKeyword;
    this.from = props.from;
    this.to = props.to;
    this.data = props.data;
  }
}

export interface IFindVideoByKeyword
  extends Omit<FindVideoChannelHistory, 'relationKeyword'> {}
