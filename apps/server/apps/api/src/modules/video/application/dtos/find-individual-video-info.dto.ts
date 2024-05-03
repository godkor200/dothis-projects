import { IQuery } from '@nestjs/cqrs';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zFindIndividualVideoInfoParams } from '@dothis/dto';
export class FindIndividualVideoInfoParams extends createZodDto(
  extendApi(zFindIndividualVideoInfoParams),
) {
  constructor(props: FindIndividualVideoInfoParams) {
    super();
    Object.assign(this, props);
  }
}
export class FindIndividualVideoInfoV1Dto extends FindIndividualVideoInfoParams {}

export enum PredictionStatus {
  INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
  PREDICTING = 'PREDICTING',
}
