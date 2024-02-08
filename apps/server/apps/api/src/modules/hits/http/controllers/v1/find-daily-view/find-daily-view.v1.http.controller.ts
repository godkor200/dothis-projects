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

const c = nestControllerContract(apiRouter.dailyViews);

@Controller()
export class FindDailyViewV1HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(c.getDailyViewsV1)
  async execute() {
    return tsRestHandler(c.getDailyViewsV1, async ({ query: inputQuery }) => {
      console.log(inputQuery);
      const query = new FindDailyViewsV1Query(inputQuery);
      console.log(query);
      const res: TFindDailyView = await this.queryBus.execute(query);

      return match<TFindDailyView, any>(res, {
        Ok: (res) => ({ status: 200, body: res }),
        Err: (err: Error) => {},
      });
    });
  }
}
