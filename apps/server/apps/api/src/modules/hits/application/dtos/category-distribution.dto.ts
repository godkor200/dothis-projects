import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { apiRouter, findVideoBySearchKeyword } from '@dothis/dto';
import { nestControllerContract } from '@ts-rest/nest';
const { getCategoryDistribution } = nestControllerContract(apiRouter.hits);
const result = getCategoryDistribution.responses[200];
export class GetCategoryDistributionQuery extends createZodDto(
  extendApi(findVideoBySearchKeyword),
) {}
export class GetCategoryDistributionDto extends GetCategoryDistributionQuery {
  constructor(props: GetCategoryDistributionQuery) {
    super();
    Object.assign(this, props);
  }
}
export class GetCategoryDistributionResult extends createZodDto(
  extendApi(result),
) {}
