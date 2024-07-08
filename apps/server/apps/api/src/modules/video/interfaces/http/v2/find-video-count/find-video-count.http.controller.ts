import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  IRes,
  TTsRestRes,
  VideoCountRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
import {
  FindVideoCountDto,
  FindVideoCountQuery,
} from '@Apps/modules/video/application/dtos/find-video-count.dto';
import { match } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { TFindVideoCount } from '@Apps/modules/video/application/queries/v1/find-video-count.query-handler';

const c = nestControllerContract(apiRouter.video);
const videoCount = c.getVideoCount;
const { summary, responses, description } = videoCount;

@ApiTags('영상')
@Controller()
export class FindVideosCountHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @TsRestHandler(videoCount)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: { type: 'string', example: '2024-01-01' },
          number: { type: 'integer', example: 1 },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  async execute(@Query() query: FindVideoCountQuery) {
    return tsRestHandler(videoCount, async ({ query }) => {
      const dto = new FindVideoCountDto(query);

      const result: TFindVideoCount = await this.queryBus.execute(dto);

      return match<TFindVideoCount, TTsRestRes<IRes<VideoCountRes>>>(result, {
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
