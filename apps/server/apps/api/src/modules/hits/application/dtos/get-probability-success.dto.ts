import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { findVideoBySearchKeyword } from '@dothis/dto';

export class GetProbabilitySuccessQuery extends createZodDto(
  extendApi(findVideoBySearchKeyword),
) {}

export class GetProbabilitySuccessDto extends GetProbabilitySuccessQuery {
  constructor(props: GetProbabilitySuccessDto) {
    super();
    Object.assign(this, props);
  }
}
