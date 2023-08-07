import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOAuthGuard, User } from '@Libs/commons/src';
import { CommandBus } from '@nestjs/cqrs';
import { UserInfoCommandDto } from '@Apps/common/auth/v1/commands/google-login-redirect/google-login-redirect.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { setCookie } from '@Libs/commons/src/util/setCookie';
const { getGoogleRedirect } = nestControllerContract(apiRouter.auth);
const { pathParams, description, summary, responses } = getGoogleRedirect;

@ApiTags(pathParams)
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

    setCookie(res, 'Authorization', 'Bearer ' + token.accessToken);
    setCookie(res, 'refreshToken', token.refreshToken);
    setCookie(res, 'google_access_token', userInfo.googleAccessToken);
    setCookie(res, 'google_refresh_token', userInfo.googleRefreshToken);
    res.redirect(
      `http${
        process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
          ? ''
          : 's'
      }://${
        process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
          ? 'localhost:3666'
          : 'www.dothis.kr'
      }/login/redirect`,
    );

    return {
      message: 'Dothis Authentication',
    };
  }
}
