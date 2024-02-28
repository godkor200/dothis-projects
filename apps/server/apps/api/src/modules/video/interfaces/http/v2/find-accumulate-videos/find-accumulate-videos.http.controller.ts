import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindAccumulateVideosV2Dtos } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { match, Result } from 'oxide.ts';
import {
  FindVideoV2,
  IFindAccumulateVideoRes,
  ISection,
} from '@Apps/modules/video/application/dtos/find-accumulate-videos.interface';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';

import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getAccVideo;

@ApiTags('영상')
@Controller()
export class FindAccumulateVideosV2HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiQuery({
    name: 'keyword',
    description: '탐색어',
    example: '페이커',
  })
  @ApiQuery({
    name: 'relationKeyword',
    description: '연관어, 연관어가 없다면 없어도됩니다.',
    example: '롤드컵',
  })
  @ApiQuery({
    name: 'from',
    description: '언제부터 날짜',
    example: '2023-11-23',
  })
  @ApiQuery({
    name: 'to',
    description: '까지 날짜',
    example: '2023-11-30',
  })
  @ApiOperation({
    summary,
    description,
  })
  @TsRest(c.getAccVideo)
  @ApiBearerAuth('Authorization')
  @ApiNotFoundResponse({
    description:
      ChannelNotFoundError.message +
      ' ,' +
      VideoNotFoundError.message +
      ' ,' +
      ChannelHistoryNotFoundError.message,
  })
  @ApiInternalServerErrorResponse({
    description: 'The number of subscribers is not within the set range.',
  })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async execute(@Query() query: FindVideoV2): Promise<IRes<ISection[]>> {
    const arg = new FindAccumulateVideosV2Dtos({
      ...query,
    });

    const result: Result<
      IFindAccumulateVideoRes<ISection[]>,
      ChannelNotFoundError | VideoNotFoundError | ChannelHistoryNotFoundError
    > = await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (
          err instanceof ChannelNotFoundError ||
          err instanceof VideoNotFoundError ||
          err instanceof ChannelHistoryNotFoundError
        ) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
