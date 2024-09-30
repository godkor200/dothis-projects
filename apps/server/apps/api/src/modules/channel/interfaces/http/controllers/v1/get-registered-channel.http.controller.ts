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
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { apiRouter, TGetRegisteredChannelRes } from '@dothis/dto';
import { match } from 'oxide.ts';

import { IRes, TTsRestRes } from '@Libs/types';
import {
  ChannelNotFoundError,
  NoRegisteredChannelsError,
} from '@Apps/modules/channel/domain/events/channel.errors';
import { InternalServerErr } from '@Apps/common/auth/domain/event/auth.error';
import {
  GetRegisteredChannelDto,
  GetRegisteredChannelQuery,
  GetRegisteredChannelRes,
} from '@Apps/modules/channel/application/dtos/register-channel.dto';
import { JwtAccessGuard } from '@Libs/oauth';
import { User } from '@Libs/commons';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { GetRegisteredChannelResult } from '@Apps/modules/channel/application/service/get-registered-channel.service';

const c = nestControllerContract(apiRouter.channel); // 채널과 관련된 라우터 정의
const { getRegisterChannelAnalysis } = c;
const { summary, description } = getRegisterChannelAnalysis;

@ApiTags('채널')
@Controller()
export class GetRegisteredChannelHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAccessGuard)
  @TsRestHandler(getRegisterChannelAnalysis)
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
  @ApiBearerAuth('Authorization')
  @ApiNotFoundResponse({ description: ChannelNotFoundError.message })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @ApiOkResponse({
    type: [GetRegisteredChannelRes],
  })
  async execute(@User() userInfo: UserInfoCommandDto) {
    return tsRestHandler(getRegisterChannelAnalysis, async () => {
      const dto = new GetRegisteredChannelDto({
        userId: userInfo.id,
      });
      const result: GetRegisteredChannelResult = await this.queryBus.execute(
        dto,
      );
      return match<
        GetRegisteredChannelResult,
        TTsRestRes<IRes<GetRegisteredChannelRes[]>>
      >(result, {
        Ok: (result) => ({
          status: 200,
          body: {
            success: true,
            data: result,
          },
        }),
        Err: (err) => {
          if (err instanceof ChannelNotFoundError) {
            throw new NotFoundException(err.message);
          }
          if (err instanceof NoRegisteredChannelsError) {
            throw new NotFoundException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
