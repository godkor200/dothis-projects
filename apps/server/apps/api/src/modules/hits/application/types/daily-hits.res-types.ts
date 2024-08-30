import { nestControllerContract } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { IIncreaseData } from '@Apps/modules/video/application/service/helpers/video.aggregate.type';

export interface IIncreaseHitsData extends IIncreaseData {
  uniqueVideoCount: number;
}
const c = nestControllerContract(apiRouter.hits);

export class getDailyHitsV1Ok extends createZodDto(
  extendApi(c.getDailyViewsV1.responses[200]),
) {}
