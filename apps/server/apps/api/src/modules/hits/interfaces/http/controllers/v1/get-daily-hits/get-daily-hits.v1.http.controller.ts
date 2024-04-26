import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';

import { QueryBus } from '@nestjs/cqrs';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { apiRouter } from '@dothis/dto';
import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { match, Result } from 'oxide.ts';
import {
  ClusterNumber,
  ClusterNumberMulti,
  FindDailyViewsV1Query,
} from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
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
import { IParamsInterface } from '@Libs/commons/src/abstract/applications.abstract';
import { ParseArrayPipe } from '@Libs/commons/src/pipes/parse-array.pipe';

const c = nestControllerContract(apiRouter.hits);
const { summary, description } = c.getDailyViewsV1,
  g = c.getDailyViewsV1;

@ApiTags('조회수')
@Controller()
export class GetDailyHitsV1HttpController {
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
  @ApiParam({
    name: 'clusterNumber',
    type: String,
    required: true,
    description: '클러스터 번호 단일, 멀티 둘다 가능',
    example: '24, 33, 22, 23, 8',
  })
  async execute(
    @Query() query: FindDailyViewsV1Query,
    @Param(ParseArrayPipe) param: IParamsInterface,
  ) {
    return tsRestHandler(
      c.getDailyViewsV1,
      async ({ query: inputQuery, params }) => {
        const query = new FindDailyViewsV1Dto({
          ...inputQuery,
          clusterNumber: param.clusterNumber,
        });

        const res: TFindDailyView = await this.queryBus.execute(query);

        return match<TFindDailyView, TTsRestRes<IRes<IIncreaseHitsData[]>>>(
          res,
          {
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
          },
        );
      },
    );
  }
}
