import { nestControllerContract } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

const c = nestControllerContract(apiRouter.hits);

export class AnalysisHitsOk extends createZodDto(
  extendApi(c.getAnalysisHits.responses[200]),
) {}
