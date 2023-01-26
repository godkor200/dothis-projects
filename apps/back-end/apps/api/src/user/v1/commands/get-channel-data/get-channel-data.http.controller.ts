import { CommandBus } from '@nestjs/cqrs';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  Cookies,
  JwtAccessGuard,
  TDecodePayload,
  User,
} from '@Libs/commons/src';

@Controller('/user')
export class GetChannelDataHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/get-channel-data')
  @UseGuards(JwtAccessGuard)
  async getChannelData(
    @Req() req: Request,
    @User() user: TDecodePayload,
    @Cookies() cookie: { googleAccessToken: string },
  ) {
    const userId = user.userId;
    const accessToken = cookie.googleAccessToken;

    return await this.commandBus.execute({ userId, accessToken });
  }
}
