import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { IPagingRes } from '@Apps/modules/video/application/dtos/find-many-video.interface';
import {
  VideoRes,
  IRes,
  TTsRestRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { match } from 'oxide.ts';
import { GetVideoPaginatedPageDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { TGetVideoPage } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';
import { ClusterNumberMulti } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { PaginatedIgniteQueryParams } from '@Libs/commons/src/interfaces/types/dto.types';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
import { ParseArrayPipe } from '@Libs/commons/src/pipes/parse-array.pipe';
import { IParamsInterface } from '@Libs/commons/src/abstract/applications.abstract';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getVideoPageV1;

@ApiTags('영상')
@Controller()
export class FindVideoPageHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @TsRestHandler(c.getVideoPageV1)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: VideoRes })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @ApiParam({
    name: 'clusterNumber',
    type: String,
    required: true,
    description: '클러스터 번호 단일, 멀티 둘다 가능',
    example: '4, 93, 14, 13, 57, 5, 43, 1, 10, 45',
  })
  async execute(
    @Query() query: PaginatedIgniteQueryParams,
    @Param(ParseArrayPipe) param: IParamsInterface,
  ) {
    return tsRestHandler(c.getVideoPageV1, async ({ params, query }) => {
      const arg = new GetVideoPaginatedPageDto({
        clusterNumber: param.clusterNumber,
        ...query,
      });
      const data: TGetVideoPage = await this.queryBus.execute(arg);

      return match<TGetVideoPage, TTsRestRes<IRes<IPagingRes>>>(data, {
        Ok: (result) => ({
          status: 200,
          body: {
            success: true,
            data: result,
          },
        }),
        Err: (err: Error) => {
          if (err instanceof VideoNotFoundError)
            throw new NotFoundException(err.message);
          if (err instanceof TableNotFoundException)
            throw new InternalServerErrorException(err.message);
          throw err;
        },
      });
    });
  }
}
