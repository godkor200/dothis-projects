import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import {
  externalApiRouter,
  TVideoVideoResponse,
  zDuplicateException,
  zRequestVideoSchema,
  zWebhookUrlTokenMismatch,
} from '@dothis/dto';
import {
  ApiBadRequestResponse,
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
import { IResWithItem, TokenExpired, TTsRestRes } from '@Libs/types';
import { JwtAccessGuard } from '@Libs/oauth';
import {
  InvalidYoutubeUrlException,
  DuplicateException,
} from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { SuccessBase } from '@Apps/modules/story-board/application/dtos';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { WebhookUrlTokenMismatchException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/webhook-response-failed.exception';
const c = nestControllerContract(externalApiRouter.video);
const { postReqVideo } = c;
const { summary, description } = postReqVideo;

class WebhookUrlTokenMismatchZodException extends createZodDto(
  extendApi(zWebhookUrlTokenMismatch),
) {}
class DuplicateZodException extends createZodDto(
  extendApi(zDuplicateException),
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
  @ApiConflictResponse({ type: DuplicateZodException })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @ApiBadRequestResponse({ type: WebhookUrlTokenMismatchZodException })
  async execute(@Body() body: PostReqVideoBody) {
    return tsRestHandler(postReqVideo, async ({ body }) => {
      const token = body.token;
      const isTokenValid = zRequestVideoSchema.shape.token.safeParse(token);

      if (!isTokenValid.success) {
        return { status: 400, body: isTokenValid };
      }
      const res: TPostRequestVideoRes = await this.commandBus.execute(
        new PostRequestVideoDto(body),
      );
      return match<
        TPostRequestVideoRes,
        TTsRestRes<IResWithItem<TVideoVideoResponse>>
      >(res, {
        Ok: (res) => ({
          status: 200,
          body: { success: true, item: res },
        }),
        Err: (err) => {
          if (err instanceof DuplicateException) {
            throw new ConflictException(err.message);
          }
          if (err instanceof InvalidYoutubeUrlException) {
            throw new BadRequestException(err.message);
          }
          if (err instanceof WebhookUrlTokenMismatchException) {
            throw new BadRequestException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
