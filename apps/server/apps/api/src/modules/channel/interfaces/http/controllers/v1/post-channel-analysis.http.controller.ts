import { CommandBus } from '@nestjs/cqrs';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { JwtAccessGuard } from '@Libs/oauth';
import {
  ApiTags,
  ApiOperation,
  ApiHeaders,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import {
  ChannelAnalysisResp,
  RegisterChannelBody,
  RegisterChannelDto,
} from '@Apps/modules/channel/application/dtos/register-channel.dto';
import { match } from 'oxide.ts'; // Import match for handling results
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { IRes } from '@Libs/types';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { User } from '@Libs/commons';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';

const c = nestControllerContract(apiRouter.channel);
const { registerChannelAnalysis } = c;
const { summary, description } = registerChannelAnalysis;

@ApiTags('채널')
@Controller()
export class RegisterChannelHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAccessGuard)
  @TsRest(registerChannelAnalysis)
  @ApiOperation({
    summary,
    description,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
  ])
  @ApiBearerAuth('Authorization')
  @ApiCreatedResponse({ description: '채널이 성공적으로 등록되었습니다.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBody({ type: RegisterChannelBody })
  @ApiResponse({ type: ChannelAnalysisResp })
  async execute(
    @Body() body: RegisterChannelBody,
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes> {
    const command = new RegisterChannelDto({
      registeredChannelId: body.registeredChannelId,
      userId: userInfo.id,
    });

    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: (response) => ({
        success: true,
      }),
      Err: (err: Error) => {
        if (err instanceof ChannelNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw new InternalServerErrorException(err.message);
      },
    });
  }
}
