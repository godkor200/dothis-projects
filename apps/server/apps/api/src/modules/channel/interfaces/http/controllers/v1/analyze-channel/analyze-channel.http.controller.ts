import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard, TDecodePayload, User } from '@Libs/commons/src';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { GetAnalyzeMyChannel } from '@Apps/modules/channel/application/dtos/analyze-channel.interface';
import { match } from 'oxide.ts';
import {
  ChannelAnalysisRes,
  IRes,
} from '@Libs/commons/src/interfaces/types/res.types';

const { analyzeChannel } = nestControllerContract(apiRouter.channel);

const { summary, description } = analyzeChannel;
@ApiTags('채널')
@Controller()
export class AnalyzeChannelHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @UseGuards(JwtAccessGuard)
  @TsRest(analyzeChannel)
  @ApiBearerAuth('Authorization')
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: ChannelNotFoundError.message,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
  ])
  @ApiOperation({
    summary,
    description,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiOkResponse({ type: ChannelAnalysisRes })
  async execute(
    @User() user: TDecodePayload,
  ): Promise<IRes<ChannelAnalysisRes>> {
    const arg = new GetAnalyzeMyChannel({ channelId: user.channelId });

    const result = await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof ChannelNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
