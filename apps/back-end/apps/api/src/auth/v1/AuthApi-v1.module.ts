import { Module } from '@nestjs/common';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import { GoogleStrategy } from '@Libs/commons/src/oauth/strategy/google.strategy';
import { AtStrategy } from '@Libs/commons/src/oauth/strategy/accessToken.strategy';

import { AuthApiController } from './AuthApi-v1.controller';
import { AuthApiService } from '../AuthApi.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RtStrategy } from '@Libs/commons/src/oauth/strategy/refreshToken.strategy';

@Module({
  imports: [UserModule, ConfigModule.forRoot()],
  controllers: [AuthApiController],
  providers: [
    GoogleStrategy,
    AtStrategy,
    RtStrategy,
    JwtService,
    { provide: 'AUTH_SERVICE', useClass: AuthApiService },
  ],
})
export class AuthApiV1Module {}
