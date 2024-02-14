import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';

import { QueryBus } from '@nestjs/cqrs';
import { Controller, Req } from '@nestjs/common';
import { apiRouter } from '@dothis/dto';
import { FindDailyViewsV1Query } from '@Apps/modules/hits/application/queries/find-daily-view.v1.query';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/find-daily-view.v1.query-handler';
import { match } from 'oxide.ts';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { IIncreaseData } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { ApiParam } from '@nestjs/swagger';

const c = nestControllerContract(apiRouter.dailyViews);

@Controller()
export class FindDailyViewV1HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(c.getDailyViewsV1)
  @ApiParam({
    name: 'clusterNumber',
    description: '찾을 비디오의 클러스터 번호 값을 입력받습니다.',
    example: '6',
  })
  async execute() {
    return tsRestHandler(
      c.getDailyViewsV1,
      async ({ query: inputQuery, params }) => {
        const query = new FindDailyViewsV1Query({
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
