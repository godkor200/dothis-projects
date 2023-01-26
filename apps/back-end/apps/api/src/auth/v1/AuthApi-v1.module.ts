import { Module, Provider } from '@nestjs/common';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import {
  GoogleStrategy,
  AtStrategy,
  RtStrategy,
} from '@Libs/commons/src/oauth/strategy';
import { AuthApiService } from '../AuthApi.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GoogleLoginHttpController } from '@Apps/api/src/auth/v1/commands/google-login/goolgle-login.http.controller';
import { GoogleLoginRedirectHttpController } from '@Apps/api/src/auth/v1/commands/google-login-redirect/google-login-redirect.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from '@Apps/api/src/user/v1/db/user.repository';
import { GoogleLoginRedirectCommandHandler } from '@Apps/api/src/auth/v1/commands/google-login-redirect/google-login-redirect.service';
import { USER_REPOSITORY } from '@Apps/api/src/user/user.di-token';
import { VerifyAccessTokenHttpController } from '@Apps/api/src/auth/v1/commands/verify-access-token/verify-access-token.http.controller';

const httpControllers = [
  GoogleLoginHttpController,
  GoogleLoginRedirectHttpController,
  VerifyAccessTokenHttpController,
];

const strategies: Provider[] = [GoogleStrategy, AtStrategy, RtStrategy];

const commandHandlers: Provider[] = [GoogleLoginRedirectCommandHandler];

const repositories: Provider[] = [
  { provide: 'AUTH_SERVICE', useClass: AuthApiService },
  { provide: USER_REPOSITORY, useClass: UserRepository },
];
@Module({
  controllers: [...httpControllers],
  imports: [
    CqrsModule,
    UserModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [...strategies, ...repositories, ...commandHandlers],
})
export class AuthApiV1Module {}
