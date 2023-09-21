import { Controller, Req, Res } from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { CommandBus } from '@nestjs/cqrs';
import { CookieOptions, Request, Response } from 'express';
import { apiRouter } from '@dothis/dto';
import { Cookies } from '@Libs/commons/src';
import { TokenDto } from '@Apps/common/auth/commands/v1/verify-token/verify-token.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
const { getVerifyToken } = nestControllerContract(apiRouter.auth);
const { pathParams, description, summary, responses } = getVerifyToken;
@ApiTags('유저 인증')
@Controller()
export class VerifyTokenHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOkResponse({ description: responses[200] })
  @ApiUnauthorizedResponse({ description: responses[401] })
  @ApiInternalServerErrorResponse({ description: responses[500] })
  @ApiOperation({
    summary,
    description,
  })
  @TsRest(getVerifyToken)
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
  ) {
    const tokenDto = new TokenDto({
      accessToken: req.headers.authorization,
      ...cookie,
    });
    const result = await this.commandBus.execute(tokenDto);

    return {
      Authorization: 'Bearer ' + result.accessToken,
      refreshToken: result.refreshToken,
    };
  }
}
