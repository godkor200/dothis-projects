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
import { apiRouter } from '@dothis/dto';
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

const { getVerifyToken } = nestControllerContract(apiRouter.auth);
const { description, summary, responses } = getVerifyToken;
@ApiTags('유저 인증')
@Controller()
export class VerifyTokenHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOkResponse({ description: responses[200] })
  @ApiUnauthorizedResponse({ description: UnauthorizedExceptionError.message })
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
      accessToken: req.headers.authorization,
      ...cookie,
    });
    const result: Result<ITokenRes, UnauthorizedExceptionError> =
      await this.commandBus.execute(tokenDto);

    return match(result, {
      Ok: (result) => {
        res.header('Authorization', 'Bearer ' + result.accessToken);
        res.cookie('refreshToken', result.refreshToken);
        return {
          success: true,
          data: {
            message: 'authorized',
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
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
