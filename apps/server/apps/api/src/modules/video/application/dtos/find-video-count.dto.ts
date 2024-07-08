import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { findVideoBySearchKeyword } from '@dothis/dto';

export class FindVideoCountQuery extends createZodDto(
  extendApi(findVideoBySearchKeyword),
) {
  constructor(props: FindVideoCountQuery) {
    super();
    Object.assign(this, props);
  }
}

export class FindVideoCountDto extends FindVideoCountQuery {
  constructor(props: FindVideoCountQuery) {
    super(props);
    Object.assign(this, props);
  }
}
