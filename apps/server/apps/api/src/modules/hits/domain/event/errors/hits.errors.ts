import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { nestControllerContract } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
const c = nestControllerContract(apiRouter.dailyViews);

export class Ok extends createZodDto(
  extendApi(c.getDailyViewsV1.responses[200]),
) {}
export class NotFound extends createZodDto(
  extendApi(c.getDailyViewsV1.responses[404]),
) {}
export class BadReq extends createZodDto(
  extendApi(c.getDailyViewsV1.responses[400]),
) {}
