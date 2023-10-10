import {
  Controller,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { CommandBus } from '@nestjs/cqrs';
import { CookieOptions, Request, Response } from 'express';
import { apiRouter, USER_AUTH } from '@dothis/dto';
import { Cookies } from '@Libs/commons/src';
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
import { AuthGuard } from '@Apps/common/auth/guards/auth.guard';
import { TokenExpired } from '@Libs/commons/src/types/dto.types';

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
    description: `${USER_AUTH.AccessTokenExpired} or ${USER_AUTH.RefreshTokenExpired} or ${USER_AUTH.NoTokenProvided} 메세지가 뜹니다`,
    type: TokenExpired,
  })
  @ApiInternalServerErrorResponse({ description: responses[500] })
  @ApiOperation({
    summary,
    description,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
    {
      name: 'Cookie',
      description: "refreshToken(ex:'refreshToken=eradsfae')",
    },
  ])
  @TsRest(getVerifyToken)
  @UseGuards(AuthGuard)
  async verifyAccessToken(
    @Req() req: Request,
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
      userInfo: req['user'],
      ...cookie,
    });
    const result: Result<ITokenRes, UnauthorizedExceptionError> =
      await this.commandBus.execute(tokenDto);
    const options: CookieOptions = {
      domain: '.dothis.kr',
      //!envDiscrimination(req) ? '.dothis.kr' : 'localhost',
      path: '/',
      secure: true,
      sameSite: 'none',
    };
    return match(result, {
      Ok: (result) => {
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
