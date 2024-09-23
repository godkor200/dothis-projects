import { QueryBus } from '@nestjs/cqrs';
import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { match } from 'oxide.ts';
import { IRes } from '@Libs/types';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import {
  GetVideoTimelineQuery,
  GetVideoTimelineDto,
  GetVideoTimelineResult,
} from '@Apps/modules/video/application/dtos/video-timeline.dto';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { ExternalAiServerError } from '@Apps/modules/related-word/domain/errors/related-words.errors';

const { getVideoTimeline } = nestControllerContract(apiRouter.channel);
const { summary, description } = getVideoTimeline;

@ApiTags('채널')
@Controller()
export class VideoTimelineController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getVideoTimeline)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: [GetVideoTimelineResult] })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Query() query: GetVideoTimelineQuery,
  ): Promise<IRes<GetVideoTimelineResult[]>> {
    const arg = new GetVideoTimelineDto(query);

    const result = await this.queryBus.execute(arg);

    return match(result, {
      Ok: (timelineResults) => ({
        success: true,
        data: timelineResults,
      }),
      Err: (err: Error) => {
        if (err instanceof ChannelNotFoundError) {
          throw new NotFoundException(err.message);
        }
        if (err instanceof ExternalAiServerError) {
          throw new InternalServerErrorException(err.message);
        }
        throw new InternalServerErrorException(
          'Internal error occurred',
          err.message,
        );
      },
    });
  }
}
