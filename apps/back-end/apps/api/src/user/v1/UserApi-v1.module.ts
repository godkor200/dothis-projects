import { Module } from '@nestjs/common';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import { UserApiController } from './UserApi.controller';
import { UserApiService } from '../UserApi.service';
import { UserApiQueryRepository } from '../UserApiQueryRepository';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from '@Libs/commons/oauth/google.strategy';
@Module({
  imports: [UserModule, ConfigModule.forRoot()],
  controllers: [UserApiController],
  providers: [UserApiService, UserApiQueryRepository, GoogleStrategy],
})
export class UserApiV1Module {}
