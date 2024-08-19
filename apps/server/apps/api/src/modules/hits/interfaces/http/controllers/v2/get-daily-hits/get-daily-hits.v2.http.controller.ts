import { Controller, NotFoundException, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { apiRouter, zGetDailyViewsV2Res } from '@dothis/dto';
import {
  BadReq,
  InternalServerErr,
  NotFound,
} from '@Apps/modules/hits/domain/events/errors/hits.errors';
import { FindDailyViewsV1Query } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { FindDailyViewsV2Dto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { match } from 'oxide.ts';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';
import { IIncreaseHitsData } from '@Apps/modules/video/application/service/helpers/video.aggregate.service';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
const c = nestControllerContract(apiRouter.hits);
const { summary, description } = c.getDailyViewsV2,
  g = c.getDailyViewsV2;

class GetDailyViewsV2Res extends createZodDto(extendApi(zGetDailyViewsV2Res)) {}

@ApiTags('조회수')
@Controller()
export class GetDailyHitsV2HttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @TsRestHandler(g)
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({ type: NotFound })
  @ApiBadRequestResponse({ type: BadReq })
  @ApiOkResponse({ type: GetDailyViewsV2Res })
  @ApiInternalServerErrorResponse({ type: InternalServerErr })
  async execute(@Query() query: FindDailyViewsV1Query) {
    return tsRestHandler(g, async ({ query }) => {
      const dto = new FindDailyViewsV2Dto(query);

      const res: TFindDailyView = await this.queryBus.execute(dto);
      return match<TFindDailyView, TTsRestRes<IRes<IIncreaseHitsData[]>>>(res, {
        Ok: (res: IRes<IIncreaseHitsData[]>) => ({
          status: 200,
          body: res,
        }),
        Err: (err: Error) => {
          if (err instanceof VideoNotFoundError) {
            throw new NotFoundException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
