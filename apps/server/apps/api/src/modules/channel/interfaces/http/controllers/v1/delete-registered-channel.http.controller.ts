import { CommandBus } from '@nestjs/cqrs';
import {
  Controller,
  UseGuards,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { JwtAccessGuard } from '@Libs/oauth';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeaders,
} from '@nestjs/swagger';
import { match } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { User } from '@Libs/commons';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';

import { IRes } from '@Libs/types';
import { DeleteChannelDto } from '@Apps/modules/channel/application/dtos/delete-register-channel.dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
const c = nestControllerContract(apiRouter.channel);

const { deleteChannel } = c;
const { summary, description } = deleteChannel;

@ApiTags('채널')
@Controller()
export class DeleteRegisteredChannelHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAccessGuard)
  @TsRest(deleteChannel)
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
  @ApiResponse({
    description: '채널이 성공적으로 삭제되었습니다.',
    status: 200,
  })
  @ApiResponse({ description: '채널을 찾을 수 없습니다.', status: 404 })
  @ApiResponse({ description: '서버 오류', status: 500 })
  async execute(
    @Param('channelId') channelId: string,
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes> {
    const command = new DeleteChannelDto({
      channelId,
      userId: userInfo.id,
    });

    const result = await this.commandBus.execute(command);

    return match(result, {
      Ok: () => ({
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
