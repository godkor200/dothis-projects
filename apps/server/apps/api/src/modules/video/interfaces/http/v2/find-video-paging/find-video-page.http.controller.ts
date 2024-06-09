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
import {
  GetVideoPaginatedPageSortDto,
  GetVideoPaginatedPageSortQuery,
} from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { TGetVideoPage } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
const c = nestControllerContract(apiRouter.video);
const findVideoPage = c.getVideoPageV2;
const { summary, responses, description } = findVideoPage;

@ApiTags('영상')
@Controller()
export class FindVideoPageHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @TsRestHandler(findVideoPage)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: VideoRes })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  async execute(@Query() query: GetVideoPaginatedPageSortQuery) {
    return tsRestHandler(findVideoPage, async ({ query }) => {
      const arg = new GetVideoPaginatedPageSortDto(query);
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
