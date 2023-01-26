import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { apiUser } from '@dothis/share/lib/dto';
import { initNestServer } from '@ts-rest/nest';
import { Request, Response } from 'express';
import { Cookies, GoogleOAuthGuard, User } from '@Libs/commons/src';
import { CommandBus } from '@nestjs/cqrs';
import { UserInfoCommandDto } from '@Apps/api/src/auth/v1/commands/google-login-redirect/google-login-redirect.service';

const s = initNestServer(apiUser);
@Controller('/auth')
export class GoogleLoginRedirectHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('/google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @User() userInfo: UserInfoCommandDto,
  ) {
    const aToken: { accessToken: string; refreshToken: string } =
      await this.commandBus.execute(new UserInfoCommandDto(userInfo));

    res.setHeader('Authorization', 'Bearer ' + aToken.accessToken);
    return aToken;
  }
}
