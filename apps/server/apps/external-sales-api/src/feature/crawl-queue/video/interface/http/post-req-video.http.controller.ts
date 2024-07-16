import { Body, ConflictException, Controller, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { externalApiRouter, zChannelErrConflict } from '@dothis/dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  PostRequestVideoDto,
  PostReqVideoBody,
} from '@ExternalApps/feature/crawl-queue/video/application/dto/post-req-video.dto';
import { match } from 'oxide.ts';
import { TPostRequestVideoRes } from '@ExternalApps/feature/crawl-queue/video/application/commands/post-req-video.command';
import {
  IRes,
  TokenExpired,
  TTsRestRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { JwtAccessGuard } from '@Libs/commons/src';
import { VideoDuplicateException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { SuccessBase } from '@Apps/modules/story-board/application/dtos';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
const c = nestControllerContract(externalApiRouter.video);
const { postReqVideo } = c;
const { summary, responses, description } = postReqVideo;

class VideoErrDuplicateException extends createZodDto(
  extendApi(zChannelErrConflict),
) {}

@Controller()
@ApiTags('크롤링 될 영상 정보')
export class PostReqVideoHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRestHandler(postReqVideo)
  @ApiOperation({
    summary,
    description,
  })
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('Authorization')
  @ApiForbiddenResponse({ type: TokenExpired })
  @ApiOkResponse({ type: SuccessBase })
  @ApiConflictResponse({ type: VideoErrDuplicateException })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  async execute(@Body() body: PostReqVideoBody) {
    return tsRestHandler(postReqVideo, async ({ body }) => {
      const res: TPostRequestVideoRes = await this.commandBus.execute(
        new PostRequestVideoDto(body),
      );
      return match<TPostRequestVideoRes, TTsRestRes<IRes>>(res, {
        Ok: (res) => ({
          status: 200,
          body: { success: res },
        }),
        Err: (err) => {
          if (err instanceof VideoDuplicateException) {
            throw new ConflictException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
