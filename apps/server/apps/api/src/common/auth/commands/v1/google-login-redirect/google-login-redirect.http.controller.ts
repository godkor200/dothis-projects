import {
  Controller,
  NotFoundException,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { GoogleOAuthGuard, User } from '@Libs/commons/src';
import { CommandBus } from '@nestjs/cqrs';
import { UserInfoCommandDto } from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { GoogleLoginRedirectRes } from '@Apps/common/auth/interface/google-login-redirect.interface';
import { match, Result } from 'oxide.ts';
import { InternalServerErrorException } from '@Libs/commons/src/exceptions/exceptions';

const { getGoogleRedirect } = nestControllerContract(apiRouter.auth);
const { description, summary, responses } = getGoogleRedirect;

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
  @ApiInternalServerErrorResponse({
    description: InternalServerErrorException.message,
  })
  @Redirect('http://localhost:3666/login/redirect', 302)
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @User() userInfo: UserInfoCommandDto,
  ): Promise<{ url: string }> {
    const result: Result<GoogleLoginRedirectRes, InternalServerErrorException> =
      await this.commandBus.execute(new UserInfoCommandDto(userInfo));

    const options: CookieOptions = {
      domain: '*',
      //!envDiscrimination(req) ? '.dothis.kr' : 'localhost',
      path: '/',
      httpOnly: true,
    };

    res.cookie('google_access_token', userInfo.googleAccessToken, options);
    res.cookie('google_refresh_token', userInfo.googleRefreshToken, options);

    return match(result, {
      Ok: (result) => ({
        url: `http://localhost:3666/login/redirect?isNewUser=${result.isNewUser}&accessToken=${result.accessToken}&refreshToken=${result.refreshToken}`,
      }),
      Err: (err: Error) => {
        if (err instanceof InternalServerErrorException)
          throw new InternalServerErrorException(err.message);
        throw err;
      },
    });
  }
}
