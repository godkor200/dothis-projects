import { Controller, Req, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from '@Libs/commons/src';
import { Api, initNestServer } from '@ts-rest/nest';
import { Request } from 'express';
import { apiUser } from '@dothis/share/lib/dto';
const s = initNestServer(apiUser);

@Controller('/auth')
export class VerifyAccessTokenHttpController {
  @UseGuards(JwtAccessGuard)
  @Api(s.route.verifyAccessTokenPost)
  async verifyAccessToken(@Req() req: Request) {
    return { message: 'authorized' };
  }
}
