import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zClusterNumberMulti, zFindAccumulateQuery } from '@dothis/dto';
import { IParamsInterface } from '@Libs/commons/abstract/applications.abstract';
export class FindPerformanceLengthQuery extends createZodDto(
  extendApi(zFindAccumulateQuery),
) {}
export class FindPerformanceLengthParams extends createZodDto(
  extendApi(zClusterNumberMulti),
) {}

export class FindPerformanceLengthDto
  extends FindPerformanceLengthQuery
  implements IParamsInterface
{
  readonly clusterNumber: string[];
  constructor(props: FindPerformanceLengthDto) {
    super();
    Object.assign(this, props);
  }
}
