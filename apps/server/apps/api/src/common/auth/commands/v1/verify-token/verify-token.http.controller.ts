import { Controller, Res, UnauthorizedException } from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { CommandBus } from '@nestjs/cqrs';
import { CookieOptions, Request, Response } from 'express';
import { apiRouter, USER_AUTH } from '@dothis/dto';
import { Cookies, TDecodePayload, User } from '@Libs/commons/src';
import { TokenDto } from '@Apps/common/auth/commands/v1/verify-token/verify-token.service';
import {
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { IRes } from '@Libs/commons/src/types/res.types';
import { ITokenRes } from '@Apps/common/auth/interface/get-own-info.interface';
import { match, Result } from 'oxide.ts';
import { UnauthorizedExceptionError } from '@Apps/common/auth/domain/event/auth.error';
import { TokenExpired } from '@Libs/commons/src/types/res.types';

const { getVerifyToken } = nestControllerContract(apiRouter.auth);
const { description, summary, responses } = getVerifyToken;
@ApiTags('유저 인증')
@Controller()
export class VerifyTokenHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOkResponse({
    status: 200,
    isArray: false,
    description: '쿠키와 해더로 토큰이 res 됩니다.',
  })
  @ApiUnauthorizedResponse({
    description: `${USER_AUTH.RefreshTokenExpired} or ${USER_AUTH.NoTokenProvided} 메세지가 뜹니다`,
    type: TokenExpired,
  })
  @ApiInternalServerErrorResponse({ description: responses[500] })
  @ApiOperation({
    summary,
    description,
  })
  @ApiHeaders([
    {
      name: 'Cookie',
      description: "refreshToken(ex:'refreshToken=eradsfae')",
    },
  ])
  @TsRest(getVerifyToken)
  async verifyAccessToken(
    @User() user: TDecodePayload,
    @Res({ passthrough: true })
    res: Response,
    @Cookies()
    cookie: {
      refreshToken: string;
      google_access_token: string;
      google_refresh_token: string;
    },
  ): Promise<IRes<ITokenRes>> {
    const tokenDto = new TokenDto({
      userInfo: user,
      ...cookie,
    });
    const result: Result<ITokenRes, UnauthorizedExceptionError> =
      await this.commandBus.execute(tokenDto);
    const options: CookieOptions = {
      domain: '.dothis.kr',
      path: '/',
      secure: true,
      sameSite: 'none',
    };

    return match(result, {
      Ok: (result) => {
        res.header('Accesss-Control-Allow-Headers', 'Authorization');
        res.header('Authorization', 'Bearer ' + result.accessToken);
        res.cookie('refreshToken', result.refreshToken, options);
        return {
          success: true,
          data: {
            message: 'authorized',
          },
        };
      },
      Err: (err: Error) => {
        if (err instanceof UnauthorizedExceptionError) {
          throw new UnauthorizedException(err.message);
        }
        throw err;
      },
    });
  }
}
