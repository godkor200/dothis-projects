import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthApiService } from '@Apps/api/src/auth/AuthApi.service';

@Injectable()
export class RtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authApiService: AuthApiService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) =>
          (request?.cookies?.['refresh-token'] as string).split('Bearer ')[1],
      ]),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const refreshToken = req?.cookies?.['refresh-token'].split('Bearer ')[1];
    const decodePayload = this.authApiService.decodeToken(refreshToken);

    const matchToken = await this.authApiService.getUserIfRefreshTokenMatches(
      refreshToken,
      decodePayload.userId,
    );
    if (!matchToken)
      throw new HttpException('message', HttpStatus.UNAUTHORIZED);

    return {
      req,
    };
  }
}
