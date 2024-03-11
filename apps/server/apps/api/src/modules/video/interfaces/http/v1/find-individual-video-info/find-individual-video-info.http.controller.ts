import { QueryBus } from '@nestjs/cqrs';
import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import {
  FindIndividualVideoInfoParams,
  FindIndividualVideoInfoV1Dto,
} from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { match } from 'oxide.ts';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { apiRouter, VideoDetailsModel } from '@dothis/dto';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import {
  VideoInfoRes,
  IRes,
  TTsRestRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/events/channel_history.error';
import { TVideoIndividualRes } from '@Apps/modules/video/application/queries/v1/find-individual-video-info.query-handler';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getIndividualVideo;

@ApiTags('영상')
@Controller()
export class FindIndividualVideoInfoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(c.getIndividualVideo)
  @ApiInternalServerErrorResponse()
  @ApiOkResponse({ type: VideoInfoRes })
  @ApiNotFoundResponse({
    description: VideoNotFoundError.message,
  })
  @ApiOperation({
    summary,
    description,
  })
  async execute(@Param() param: FindIndividualVideoInfoParams) {
    return tsRestHandler(c.getIndividualVideo, async ({ params }) => {
      const arg = new FindIndividualVideoInfoV1Dto(params);
      const result: TVideoIndividualRes = await this.queryBus.execute(arg);
      return match<TVideoIndividualRes, TTsRestRes<IRes<VideoDetailsModel>>>(
        result,
        {
          Ok: (result: IRes<VideoDetailsModel>) => ({
            status: 200,
            body: result,
          }),
          Err: (err: Error) => {
            if (
              err instanceof VideoNotFoundError ||
              err instanceof ChannelHistoryNotFoundError
            ) {
              throw new NotFoundException(err.message);
            }
            throw new InternalServerErrorException(err);
          },
        },
      );
    });
  }
}
