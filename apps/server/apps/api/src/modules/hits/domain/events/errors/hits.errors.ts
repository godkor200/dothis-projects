import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { nestControllerContract } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
const c = nestControllerContract(apiRouter.hits);
const getDailyHitsV1Res = c.getDailyViewsV1.responses;

export class NotFound extends createZodDto(extendApi(getDailyHitsV1Res[404])) {}
export class BadReq extends createZodDto(extendApi(getDailyHitsV1Res[400])) {}
export class InternalServerErr extends createZodDto(
  extendApi(getDailyHitsV1Res[500]),
) {}
