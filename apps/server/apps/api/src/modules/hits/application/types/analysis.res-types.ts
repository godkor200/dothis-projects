import { nestControllerContract } from '@ts-rest/nest';
import {
  apiRouter,
  zClusterSpecificCombinedData,
  zCombinedViewsData,
} from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

const c = nestControllerContract(apiRouter.hits);

export class AnalysisHitsOk extends createZodDto(
  extendApi(c.getAnalysisHits.responses[200]),
) {}
export class AnalysisHitsV2Ok extends createZodDto(
  extendApi(zCombinedViewsData),
) {}
export class AnalysisHitsCombinedV2Ok extends createZodDto(
  extendApi(zClusterSpecificCombinedData),
) {}
