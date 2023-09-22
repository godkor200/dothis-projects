import { Controller, Redirect, Req, Res, UseGuards } from '@nestjs/common';
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
  @Redirect('http://localhost:3666/login/redirect', 302)
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @User() userInfo: UserInfoCommandDto,
  ) {
    const token: { accessToken: string; refreshToken: string } =
      await this.commandBus.execute(new UserInfoCommandDto(userInfo));

    const options: CookieOptions = {
      domain: 'localhost',
      //!envDiscrimination(req) ? '.dothis.kr' : 'localhost',
      path: '/',
      httpOnly: true,
    };

    res.cookie('google_access_token', userInfo.googleAccessToken, options);
    res.cookie('google_refresh_token', userInfo.googleRefreshToken, options);
    return {
      url: `http://localhost:3666/login/redirect?accessToken=${token.accessToken}&refreshToken=${token.refreshToken}`,
    };
  }
}
