import { QueryBus } from '@nestjs/cqrs';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { IRes } from '@Libs/commons/src/types/res.types';
import {
  ExpectedViewsDto,
  ExpectedViewsQuery,
} from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { match, Result } from 'oxide.ts';
const c = nestControllerContract(apiRouter.expectViews);
const { getExpectedViews } = c;

import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
const { summary, description } = getExpectedViews;
export interface IncreaseExpectedData {
  date: string;
  increase_expected_views: number;
  increase_expected_likes: number;
  increase_expected_comments: number;
}

@ApiTags('기대조회수')
@Controller()
export class ExpectedViewsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getExpectedViews)
  @ApiOperation({
    summary,
    description,
  })
  async execute(
    @Param('clusterNumber') clusterNumber: string,
    @Query() query: ExpectedViewsDto,
  ): Promise<IRes<IncreaseExpectedData[]>> {
    const arg = new ExpectedViewsQuery({ clusterNumber, ...query });
    const result: Result<IncreaseExpectedData[], NotFoundException> =
      await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof NotFoundException) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
