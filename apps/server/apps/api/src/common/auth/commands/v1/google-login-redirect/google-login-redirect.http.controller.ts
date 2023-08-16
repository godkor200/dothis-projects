import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { GoogleOAuthGuard, User } from '@Libs/commons/src';
import { CommandBus } from '@nestjs/cqrs';
import { UserInfoCommandDto } from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { envDiscrimination } from '@Libs/commons/src/util/setCookie';

const { getGoogleRedirect } = nestControllerContract(apiRouter.auth);
const { pathParams, description, summary, responses } = getGoogleRedirect;

@ApiTags('유저 인증')
@Controller()
export class GoogleLoginRedirectHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(getGoogleRedirect)
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary, description })
  @ApiOkResponse({
    description: responses[200],
  })
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @User() userInfo: UserInfoCommandDto,
  ) {
    const token: { accessToken: string; refreshToken: string } =
      await this.commandBus.execute(new UserInfoCommandDto(userInfo));

    const options: CookieOptions = {
      domain: !envDiscrimination(req) ? '.dothis.kr' : 'localhost',
      path: '/',
      httpOnly: true,
    };

    res.cookie('Authorization', 'Bearer ' + token.accessToken, options);
    res.cookie('refreshToken', token.refreshToken, options);
    res.cookie('google_access_token', userInfo.googleAccessToken, options);
    res.cookie('google_refresh_token', userInfo.googleRefreshToken, options);

    res.redirect(
      `http${envDiscrimination(req) ? '' : 's'}://${
        envDiscrimination(req) ? 'localhost:3666' : 'www.dothis.kr'
      }/login/redirect`,
    );
  }
}
