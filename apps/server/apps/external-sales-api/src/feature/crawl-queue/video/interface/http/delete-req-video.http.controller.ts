import {
  Param,
  Controller,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { externalApiRouter } from '@dothis/dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessBase } from '@Apps/modules/story-board/application/dtos';
import {
  DelReqVideoDto,
  DelReqVideoParam,
  PostStoryBoardQuery,
} from '@ExternalApps/feature/crawl-queue/video/application/dto/delete-req-video.dto';
import { match } from 'oxide.ts';
import {
  VideoErrNotFound,
  VideoNotFoundException,
} from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { IRes, TokenExpired, TTsRestRes } from '@Libs/types';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
import { JwtAccessGuard } from '@Libs/oauth';
import { TDelRequestVideoRes } from '@ExternalApps/feature/crawl-queue/video/domain/port/delete-req-video.inbound.port';
const c = nestControllerContract(externalApiRouter.video);
const { deleteReqVideo } = c;
const { summary, description } = deleteReqVideo;

@Controller()
@ApiTags('크롤링 될 영상 정보')
export class DeleteReqVideoHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRestHandler(deleteReqVideo)
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: SuccessBase })
  @ApiForbiddenResponse({ type: TokenExpired })
  @ApiNotFoundResponse({ type: VideoErrNotFound })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  async execute(
    @Param() param: DelReqVideoParam,
    @Query() query: PostStoryBoardQuery,
  ) {
    const command = new DelReqVideoDto({
      videoId: param.videoId,
      vodId: query.vodId,
      clientId: query.clientId,
    });
    return tsRestHandler(deleteReqVideo, async ({}) => {
      const res: TDelRequestVideoRes = await this.commandBus.execute(command);
      return match<TDelRequestVideoRes, TTsRestRes<IRes>>(res, {
        Ok: (res) => ({
          status: 200,
          body: { success: res },
        }),
        Err: (err) => {
          if (err instanceof VideoNotFoundException) {
            throw new NotFoundException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
