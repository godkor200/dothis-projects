import { QueryBus } from '@nestjs/cqrs';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { match } from 'oxide.ts';

import {
  GetProbabilitySuccessDto,
  GetProbabilitySuccessQuery,
} from '@Apps/modules/hits/application/dtos/get-probability-success.dto';
import {
  TGetProbabilityRes,
  GetProbabilityRes,
} from '@Apps/modules/hits/application/queries/get-probability-success.query-handler';

import {
  GetProbabilityResultType,
  IRes,
  TTsRestRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
import { ParseArrayPipe } from '@Libs/commons/src/pipes/parse-array.pipe';
import { IParamsInterface } from '@Libs/commons/src/abstract/applications.abstract';
const c = nestControllerContract(apiRouter.hits);
const { getProbabilitySuccess } = c;
const { summary, description } = getProbabilitySuccess;

@ApiTags('조회수')
@Controller()
export class GetProbabilitySuccessHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @TsRestHandler(getProbabilitySuccess)
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @ApiOkResponse({
    type: GetProbabilityResultType,
  })
  @ApiParam({
    name: 'clusterNumber',
    type: String,
    required: true,
    description: '클러스터 번호 단일, 멀티 둘다 가능',
    example: '24, 33, 22, 23, 8',
  })
  async execute(
    @Param(ParseArrayPipe) param: IParamsInterface,
    @Query() query: GetProbabilitySuccessQuery,
  ) {
    return tsRestHandler(getProbabilitySuccess, async ({ params, query }) => {
      const dto = new GetProbabilitySuccessDto({
        clusterNumber: param.clusterNumber,
        ...query,
      });
      const result: TGetProbabilityRes = await this.queryBus.execute(dto);
      return match<TGetProbabilityRes, TTsRestRes<IRes<GetProbabilityRes>>>(
        result,
        {
          Ok: (result) => ({ status: 200, body: result }),
          Err: (err) => {
            if (err instanceof VideoNotFoundError) {
              throw new NotFoundException(err.message);
            }
            throw err;
          },
        },
      );
    });
  }
}
