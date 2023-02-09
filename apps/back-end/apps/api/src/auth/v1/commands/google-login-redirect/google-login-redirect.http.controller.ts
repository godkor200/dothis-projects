import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOAuthGuard, User } from '@Libs/commons/src';
import { CommandBus } from '@nestjs/cqrs';
import { UserInfoCommandDto } from '@Apps/api/src/auth/v1/commands/google-login-redirect/google-login-redirect.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/auth')
export class GoogleLoginRedirectHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('/google-redirect')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: '유저 로그인 후 토큰 리턴' })
  @ApiOkResponse({
    description:
      '유저 관련 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.',
  })
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @User() userInfo: UserInfoCommandDto,
  ) {
    const token: { accessToken: string; refreshToken: string } =
      await this.commandBus.execute(new UserInfoCommandDto(userInfo));

    res.setHeader('Authorization', 'Bearer ' + token.accessToken);
    res.cookie('refreshToken', token.refreshToken);
    res.cookie('google_access_token', userInfo.goolgleAccessToken);
    res.cookie('google_refresh_token', userInfo.goolgleRefreshToken);

    return {
      message: 'Dothis Authentication',
    };
  }
}
