import { CommandBus } from '@nestjs/cqrs';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  Cookies,
  JwtAccessGuard,
  TDecodePayload,
  User,
} from '@Libs/commons/src';
import { GetChannelDataCommandDto } from '@Apps/api/src/user/v1/commands/get-channel-data/get-channel-data.service';

@Controller('/user')
export class GetChannelDataHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/get-channel-data')
  @UseGuards(JwtAccessGuard)
  async getChannelData(
    @Req() req: Request,
    @User() user: TDecodePayload,
    @Cookies() cookie: { google_access_token: string },
  ) {
    const { id: userId, userEmail } = user;
    const accessToken = cookie.google_access_token;
    return await this.commandBus.execute(
      new GetChannelDataCommandDto({ userId, userEmail, accessToken }),
    );
  }
}
