import { Module } from '@nestjs/common';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import { GoogleStrategy } from '@Libs/commons/oauth/google.strategy';
import { AuthApiController } from './AuthApi-v1.controller';
import { AuthApiService } from '../AuthApi.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, ConfigModule.forRoot()],
  controllers: [AuthApiController],
  providers: [
    GoogleStrategy,
    { provide: 'AUTH_SERVICE', useClass: AuthApiService },
  ],
})
export class AuthApiV1Module {}
