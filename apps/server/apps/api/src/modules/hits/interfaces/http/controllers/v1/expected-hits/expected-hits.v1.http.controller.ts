import { QueryBus } from '@nestjs/cqrs';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import {
  ExpectedViewsV1Dto,
  ExpectedViewsV1Query,
} from '@Apps/modules/hits/application/dtos/expected-hits.dtos';
import { match, Result } from 'oxide.ts';
import { apiRouter, TExpectedViewsRes } from '@dothis/dto';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
const c = nestControllerContract(apiRouter.hits);
const { getExpectedViews } = c;
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import {
  ExpectedViewsData,
  IRes,
  TTsRestRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { TExpectedViewsV1QueryHandlerRes } from '@Apps/modules/hits/application/queries/expected-views.v1.query-handler';
import { ClusterNumberMulti } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
const { summary, description } = getExpectedViews;

@ApiTags('조회수')
@Controller()
export class ExpectedHitsV1HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getExpectedViews)
  @ApiOperation({
    summary,
    description,
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: '평균 기대 조회수 데이터',
    type: ExpectedViewsData,
  })
  @ApiNotFoundResponse({ description: 'The video could not be found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Query() query: ExpectedViewsV1Query,
    @Param() params: ClusterNumberMulti,
  ) {
    return tsRestHandler(getExpectedViews, async ({ query, params }) => {
      const arg = new ExpectedViewsV1Dto({
        clusterNumber: params.clusterNumber,
        ...query,
      });
      const result: TExpectedViewsV1QueryHandlerRes =
        await this.queryBus.execute(arg);

      return match<
        TExpectedViewsV1QueryHandlerRes,
        TTsRestRes<IRes<TExpectedViewsRes>>
      >(result, {
        Ok: (result) => ({
          status: 200,
          body: {
            success: true,
            data: result,
          },
        }),
        Err: (err: Error) => {
          if (
            err instanceof VideoNotFoundError ||
            err instanceof ChannelNotFoundError
          ) {
            throw new NotFoundException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
