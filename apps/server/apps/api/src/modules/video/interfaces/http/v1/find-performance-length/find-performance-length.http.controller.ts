import {
  Controller,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import {
  apiRouter,
  TFindPerformanceLengthRes,
  zGetPerformanceLengthRes,
} from '@dothis/dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import {
  FindPerformanceLengthDto,
  FindPerformanceLengthQuery,
} from '@Apps/modules/video/application/dtos/find-performance-length.dto';
import { match } from 'oxide.ts';

import { IRes, TTsRestRes } from '@Libs/types';
import { TFindPerformanceLengthResult } from '@Apps/modules/video/application/queries/v1/find-performance-length.query-handler';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { ParseArrayPipe } from '@Libs/commons/pipes/parse-array.pipe';
import { IParamsInterface } from '@Libs/commons/abstract/applications.abstract';

const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getPerformanceByVideoLength;
class GetPerformanceLengthRes extends createZodDto(
  extendApi(zGetPerformanceLengthRes),
) {}
@Controller()
@ApiTags('영상')
export class FindPerformanceLengthHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(c.getPerformanceByVideoLength)
  @ApiOkResponse({ type: GetPerformanceLengthRes })
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse({
    description: VideoNotFoundError.message,
  })
  @ApiOperation({
    summary,
    description,
  })
  @ApiParam({
    name: 'clusterNumber',
    type: String,
    required: true,
    description: '클러스터 번호 단일, 멀티 둘다 가능',
    example: '4, 93, 14, 13, 57, 5, 43, 1, 10, 45',
  })
  async execute(
    @Query() query: FindPerformanceLengthQuery,
    @Param(ParseArrayPipe) param: IParamsInterface,
  ) {
    return tsRestHandler(
      c.getPerformanceByVideoLength,
      async ({ query, params }) => {
        const arg = new FindPerformanceLengthDto({
          clusterNumber: param.clusterNumber,
          ...query,
        });
        const result: TFindPerformanceLengthResult =
          await this.queryBus.execute(arg);
        return match<
          TFindPerformanceLengthResult,
          TTsRestRes<IRes<TFindPerformanceLengthRes>>
        >(result, {
          Ok: (result) => ({
            status: 200,
            body: result,
          }),
          Err: (err: Error) => {
            throw new InternalServerErrorException(err);
          },
        });
      },
    );
  }
}
