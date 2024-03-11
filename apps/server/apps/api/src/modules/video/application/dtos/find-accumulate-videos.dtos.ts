import { IQuery } from '@nestjs/cqrs';

import { zFindAccumulateQuery } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';

export class FindAccumulateVideosDto implements IQuery {
  readonly clusterNumber: string;

  readonly keyword: string;

  readonly relationKeyword: string;

  readonly from: Date;

  readonly to: Date;

  readonly user: UserInfoCommandDto;
  constructor(props: FindAccumulateVideosDto) {
    this.clusterNumber = props.clusterNumber;
    this.relationKeyword = props.relationKeyword;
    this.keyword = props.keyword;
    this.from = props.from;
    this.to = props.to;
    this.user = props.user;
  }
}

export interface FindAccumulateVideo
  extends Omit<FindAccumulateVideosDto, 'clusterNumber'> {}

export class FindAccumulateVideosV2Dto implements IQuery {
  readonly keyword: string;

  readonly relationKeyword: string;

  readonly from?: Date;

  readonly to?: Date;

  constructor(props: FindAccumulateVideosV2Dto) {
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
  readonly clusterNumber: string | string[];

  constructor(props: FindAccumulateVideosV1Dto) {
    super(props);
    if (typeof props.clusterNumber === 'string') {
      this.clusterNumber = props.clusterNumber.includes(',')
        ? props.clusterNumber.split(',')
        : props.clusterNumber;
    }
  }
}
