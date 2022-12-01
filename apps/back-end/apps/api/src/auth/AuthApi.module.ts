import { Module } from '@nestjs/common';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import { AuthApiV1Module } from './v1/AuthApi-v1.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    AuthApiV1Module,
    RouterModule.register([{ path: 'v1', module: AuthApiV1Module }]),
  ],
  controllers: [],
  providers: [],
})
export class AuthApiModule {}
