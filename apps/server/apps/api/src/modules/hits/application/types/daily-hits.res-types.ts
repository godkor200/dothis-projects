import { nestControllerContract } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

const c = nestControllerContract(apiRouter.hits);

export class getDailyHitsV1Ok extends createZodDto(
  extendApi(c.getDailyViewsV1.responses[200]),
) {}
