import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';

import { QueryBus } from '@nestjs/cqrs';
import { Controller, Param, Query } from '@nestjs/common';
import { apiRouter } from '@dothis/dto';
import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/queries/find-daily-view.v1.query';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/find-daily-view.v1.query-handler';
import { match } from 'oxide.ts';
import {
  ClusterNumber,
  FindDailyViewsV1Query,
} from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
} from '@nestjs/swagger';
import {
  BadReq,
  NotFound,
  Ok,
} from '@Apps/modules/hits/domain/event/errors/hits.errors';

const c = nestControllerContract(apiRouter.dailyViews);

@Controller()
export class FindDailyViewV1HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(c.getDailyViewsV1)
  @ApiResponse({
    status: 200,
    type: Ok,
  })
  @ApiNotFoundResponse({ type: NotFound })
  @ApiBadRequestResponse({ type: BadReq })
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

        return match<TFindDailyView, any>(res, {
          Ok: (res) => ({ status: 200, body: res }),
          Err: (err: Error) => {
            console.error(err);
          },
        });
      },
    );
  }
}
6;
