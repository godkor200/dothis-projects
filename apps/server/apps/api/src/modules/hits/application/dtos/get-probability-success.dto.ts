import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zFindVideoBySearchKeyword } from '@dothis/dto';

export class GetProbabilitySuccessQuery extends createZodDto(
  extendApi(zFindVideoBySearchKeyword),
) {}

export class GetProbabilitySuccessDto extends GetProbabilitySuccessQuery {
  readonly clusterNumber: string[];
  constructor(props: GetProbabilitySuccessDto) {
    super();
    Object.assign(this, props);
  }
}
