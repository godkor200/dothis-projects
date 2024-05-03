import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zFindIndividualVideoInfoParams } from '@dothis/dto';
import { IParamsInterface } from '@Libs/commons/src/abstract/applications.abstract';
export class FindIndividualVideoInfoParams extends createZodDto(
  extendApi(zFindIndividualVideoInfoParams),
) {
  constructor(props: FindIndividualVideoInfoParams) {
    super();
    Object.assign(this, props);
  }
}

export interface FindIndividualVideoInfoParamsInterface
  extends IParamsInterface {
  videoId: string;
}
export class FindIndividualVideoInfoV1Dto
  implements FindIndividualVideoInfoParamsInterface
{
  clusterNumber: string[];
  videoId: string;

  constructor(props: FindIndividualVideoInfoParamsInterface) {
    Object.assign(this, props);
  }
}

export enum PredictionStatus {
  INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
  PREDICTING = 'PREDICTING',
}
