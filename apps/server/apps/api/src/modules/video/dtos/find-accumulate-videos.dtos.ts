import { IQuery } from '@nestjs/cqrs';
import { UserInfoCommandDto } from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';

export class FindAccumulateVideosDtos implements IQuery {
  readonly clusterNumber: string;

  readonly keyword: string;

  readonly relationKeyword: string;

  readonly from: Date;

  readonly to: Date;

  readonly user: UserInfoCommandDto;
  constructor(props: FindAccumulateVideosDtos) {
    this.clusterNumber = props.clusterNumber;
    this.relationKeyword = props.relationKeyword;
    this.keyword = props.keyword;
    this.from = props.from;
    this.to = props.to;
    this.user = props.user;
  }
}

export interface FindAccumulateVideo
  extends Omit<FindAccumulateVideosDtos, 'clusterNumber'> {}

export class FindAccumulateVideosV2Dtos implements IQuery {
  readonly clusterNumber: string;

  readonly keyword: string;

  readonly relationKeyword: string;

  readonly from: Date;

  readonly to: Date;

  constructor(props: FindAccumulateVideosV2Dtos) {
    this.clusterNumber = props.clusterNumber;
    this.relationKeyword = props.relationKeyword;
    this.keyword = props.keyword;
    this.from = props.from;
    this.to = props.to;
  }
}

export interface FindAccumulateVideoV2
  extends Omit<FindAccumulateVideosV2Dtos, 'clusterNumber'> {}
