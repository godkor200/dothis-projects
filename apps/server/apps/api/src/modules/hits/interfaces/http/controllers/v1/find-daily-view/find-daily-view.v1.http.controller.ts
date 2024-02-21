import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';

import { QueryBus } from '@nestjs/cqrs';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { apiRouter } from '@dothis/dto';
import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/find-daily-view.v1.query-handler';
import { match, Result } from 'oxide.ts';
import {
  ClusterNumber,
  FindDailyViewsV1Query,
} from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadReq,
  InternalServerErr,
  NotFound,
  Ok,
} from '@Apps/modules/hits/domain/events/errors/hits.errors';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';
import { IIncreaseHitsData } from '@Apps/modules/video/application/service/video.aggregate.service';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
const IgniteClient = require('apache-ignite-client');
const IllegalStateError = IgniteClient.Errors.IllegalStateError;
const c = nestControllerContract(apiRouter.dailyViews);
const { summary, description } = c.getDailyViewsV1,
  g = c.getDailyViewsV1;

@ApiTags('조회수')
@Controller()
export class FindDailyViewV1HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(g)
  @ApiOkResponse({
    type: Ok,
  })
  @ApiNotFoundResponse({ type: NotFound })
  @ApiBadRequestResponse({ type: BadReq })
  @ApiInternalServerErrorResponse({ type: InternalServerErr })
  @ApiOperation({
    summary,
    description,
  })
  async execute(
    @Query() query: FindDailyViewsV1Query,
    @Param() param: ClusterNumber,
  ) {
    return tsRestHandler(
      c.getDailyViewsV1,
      async ({ query: inputQuery, params }) => {
        const query = new FindDailyViewsV1Dto({
          ...inputQuery,
          clusterNumber: params.clusterNumber,
        });
        const res: TFindDailyView = await this.queryBus.execute(query);

        return match<TFindDailyView, TTsRestRes<IRes<IIncreaseHitsData[]>>>(
          res,
          {
            Ok: (res: IRes<IIncreaseHitsData[]>) => ({
              status: 200,
              body: res,
            }),
            Err: (err: Result<void, Error>) => {
              if (err instanceof VideoNotFoundError) {
                throw new NotFoundException(err.message);
              }

              throw err.expectErr('s').message;
            },
          },
        );
      },
    );
  }
}
