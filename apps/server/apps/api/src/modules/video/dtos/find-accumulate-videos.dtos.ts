import { IQuery } from '@nestjs/cqrs';
import { UserInfoCommandDto } from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';
import { zFindAccumulateQuery } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

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
  readonly keyword: string;

  readonly relationKeyword: string;

  readonly from?: Date;

  readonly to?: Date;

  constructor(props: FindAccumulateVideosV2Dtos) {
    this.relationKeyword = props.relationKeyword;
    this.keyword = props.keyword;
    this.from = props.from;
    this.to = props.to;
  }
}

export class FindAccumulateQuery extends createZodDto(
  extendApi(zFindAccumulateQuery),
) {
  constructor(props: FindAccumulateQuery) {
    super();
    Object.assign(this, props);
  }
}

export class FindAccumulateVideosV1Dto extends FindAccumulateQuery {
  constructor(props: FindAccumulateVideosV1Dto) {
    super(props);
  }
}
export class FindAccumulateVideosV4Dto extends FindAccumulateQuery {
  constructor(props: FindAccumulateVideosV4Dto) {
    super(props);
  }
}
