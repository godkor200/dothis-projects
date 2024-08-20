import { Controller, Req, Res, UseGuards } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';

import { CommandBus } from '@nestjs/cqrs';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { GoogleLoginRedirectRes } from '@Apps/common/auth/interfaces/google-login-redirect.interface';
import { match, Result } from 'oxide.ts';
import { InternalServerErrorException, User } from '@Libs/commons';
import { GoogleOAuthGuard } from '@Libs/oauth';

const { getGoogleRedirect } = nestControllerContract(apiRouter.auth);
const { description, summary, responses } = getGoogleRedirect;

@ApiTags('유저 인증')
@Controller()
export class GoogleLoginRedirectHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(getGoogleRedirect)
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary, description })
  @ApiInternalServerErrorResponse({
    description: InternalServerErrorException.message,
  })
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @User() userInfo: UserInfoCommandDto,
  ) {
    const result: Result<GoogleLoginRedirectRes, InternalServerErrorException> =
      await this.commandBus.execute(new UserInfoCommandDto(userInfo));

    return match(result, {
      Ok: (result) => {
        const options: CookieOptions = {
          domain: '.dothis.kr',
          path: '/',
          secure: true,
          sameSite: 'none',
        };

        res.cookie('accessToken', 'Bearer ' + result.accessToken, options);
        res.cookie('refreshToken', result.refreshToken, options);
        res.cookie(
          'googleAccessToken',
          'Bearer ' + result.googleAccessToken,
          options,
        );
        res.cookie('googleRefreshToken', result.googleRefreshToken, options);
        res.redirect(
          `http${
            result.isEnvLocal ? '://localhost:3666/' : 's://dothis.kr/'
          }login/redirect?isNewUser=${result.isNewUser}&accessToken=${
            result.accessToken
          }&refreshToken=${result.refreshToken}&googleRefreshToken=${
            result.googleRefreshToken
          }&googleAccessToken=${result.googleAccessToken}`,
        );
      },
      Err: (err: Error) => {
        if (err instanceof InternalServerErrorException)
          throw new InternalServerErrorException(err.message);
        throw err;
      },
    });
  }
}
