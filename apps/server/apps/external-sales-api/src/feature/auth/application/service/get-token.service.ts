import { GetTokenInboundPort } from '@ExternalApps/feature/auth/domain/port/get-token.inbound.port';
import { GetTokenParams } from '@ExternalApps/feature/auth/application/dtos/get-token.dto';
import { GetTokenRes } from '@ExternalApps/feature/auth/application/queries/get-token.query-handler';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedErr } from '@Apps/common/auth/domain/event/auth.error';
import { Err, Ok } from 'oxide.ts';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GetTokenService implements GetTokenInboundPort {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: GetTokenParams): Promise<GetTokenRes> {
    try {
      const token = dto.token;
      const key = this.configService.get('app.DOTHIS_SECRET_KEY');
      if (token !== key) {
        return Err(new UnauthorizedErr());
      }
      return Ok({
        accessToken: this.jwtService.sign({ secret: key }, { expiresIn: '1y' }),
      });
    } catch (error) {
      return Err(error);
    }
  }
}
