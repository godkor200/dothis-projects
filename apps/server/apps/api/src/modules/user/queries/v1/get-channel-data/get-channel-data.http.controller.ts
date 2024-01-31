import { CommandBus } from '@nestjs/cqrs';
import { Controller, Req, UseGuards } from '@nestjs/common';
import {
  Cookies,
  JwtAccessGuard,
  TDecodePayload,
  User,
} from '@Libs/commons/src';
import {
  ApiConflictResponse,
  ApiCookieAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetChannelDataCommandDto } from '@Apps/modules/user/queries/v1/get-channel-data/get-channel-data.command.dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
const c = nestControllerContract(apiRouter.user);
const { getUserChannelData } = c;
const { responses, description, summary } = getUserChannelData;
@ApiTags('유저 관련')
@Controller()
@ApiCookieAuth()
export class GetChannelDataHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(getUserChannelData)
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary,
    description,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
    {
      name: 'Cookie',
      description: "구글 access-token(ex:'google_access_token=ya29.~~~~')",
    },
  ])
  @ApiOkResponse({})
  async getChannelData(
    @Req() req: Request,
    @User() user: TDecodePayload,
    @Cookies() cookie: { google_access_token: string },
  ) {
    const { id: userId, userEmail } = user;
    const accessToken = cookie?.google_access_token;
    return await this.commandBus.execute(
      new GetChannelDataCommandDto({ userId, userEmail, accessToken }),
    );
  }
}
