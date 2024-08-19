import { Body, ConflictException, Controller, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  PostRequestChannelIdDto,
  PostRequestChannelNameBody,
} from '@ExternalApps/feature/crawl-queue/channel/application/dto/post-req-channel-id.dto';
import { match } from 'oxide.ts';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { externalApiRouter } from '@dothis/dto';
import { TPostRequestChannelIdRes } from '@ExternalApps/feature/crawl-queue/channel/application/commands/post-req-channel-id.command';
import {
  IRes,
  TokenExpired,
  TTsRestRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAccessGuard } from '@Libs/commons/src';
import { ChannelDuplicateException } from '@ExternalApps/feature/crawl-queue/channel/domain/events/errors/channel.error';
import { SuccessBase } from '@Apps/modules/story-board/application/dtos';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
const c = nestControllerContract(externalApiRouter.channel);
const { postReqChannel } = c;
const { summary, responses, description } = postReqChannel;
class ChannelErrDuplicateException extends createZodDto(
  extendApi(responses[409]),
) {}
@Controller()
@ApiTags('크롤링 될 채널 정보')
export class PostReqChannelHttpController {
  constructor(private readonly commandBus: CommandBus) {}
  @ApiOperation({
    summary,
    description,
  })
  @TsRestHandler(postReqChannel)
  @ApiOkResponse({ type: SuccessBase })
  @ApiForbiddenResponse({ type: TokenExpired })
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('Authorization')
  @ApiConflictResponse({ type: ChannelErrDuplicateException })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  async execute(@Body() body: PostRequestChannelNameBody) {
    return tsRestHandler(postReqChannel, async ({ body }) => {
      const res: TPostRequestChannelIdRes = await this.commandBus.execute(
        new PostRequestChannelIdDto(body),
      );

      return match<TPostRequestChannelIdRes, TTsRestRes<IRes>>(res, {
        Ok: (res) => ({
          status: 200,
          body: { success: res },
        }),
        Err: (err) => {
          if (err instanceof ChannelDuplicateException) {
            throw new ConflictException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
