import { Module, Provider } from '@nestjs/common';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import { GoogleStrategy, AtStrategy } from '@Libs/commons/src/oauth/strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GoogleLoginHttpController } from '@Apps/api/src/auth/v1/commands/google-login/goolgle-login.http.controller';
import { GoogleLoginRedirectHttpController } from '@Apps/api/src/auth/v1/commands/google-login-redirect/google-login-redirect.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from '@Apps/api/src/user/v1/db/user.repository';
import { GoogleLoginRedirectCommandHandler } from '@Apps/api/src/auth/v1/commands/google-login-redirect/google-login-redirect.service';
import { USER_REPOSITORY } from '@Apps/api/src/user/user.di-token';
import { VerifyTokenHttpController } from '@Apps/api/src/auth/v1/commands/verify-token/verify-token.http.controller';
import { VerifyTokenCommandHandler } from '@Apps/api/src/auth/v1/commands/verify-token/verify-token.service';

const httpControllers = [
  GoogleLoginHttpController,
  GoogleLoginRedirectHttpController,
  VerifyTokenHttpController,
];

const strategies: Provider[] = [GoogleStrategy, AtStrategy];

const commandHandlers: Provider[] = [
  GoogleLoginRedirectCommandHandler,
  VerifyTokenCommandHandler,
];

const repositories: Provider[] = [
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
