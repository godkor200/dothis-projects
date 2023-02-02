import { Controller, Req, Res } from '@nestjs/common';
import { Api, initNestServer } from '@ts-rest/nest';
import { CommandBus } from '@nestjs/cqrs';
import { Request, Response } from 'express';
import { authApi } from '@dothis/share/lib/dto/auth/auth.api';
import { Cookies } from '@Libs/commons/src';
import { TokenDto } from '@Apps/api/src/auth/v1/commands/verify-token/verify-token.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
const s = initNestServer(authApi);

@Controller('/auth')
export class VerifyTokenHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiTags('auth')
  @ApiOkResponse({
    description:
      '갱신된 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.',
  })
  @ApiOperation({
    summary: '토큰 확인(accessToken,refreshToken) 후 갱신된 토큰 리턴',
  })
  @Api(s.route.getVerifyToken)
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
    res.setHeader('Authorization', 'Bearer ' + result.accessToken);
    res.cookie('refreshToken', result.refreshToken);
    return { message: 'authorized' };
  }
}
