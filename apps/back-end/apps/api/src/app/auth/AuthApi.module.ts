import { Module } from '@nestjs/common';
import { UserModule } from '@Apps/api/src/config/database/domain/user/UserModule';
import { AuthApiV1Module } from './v1/AuthApi-v1.module';
import { JwtModule } from '@nestjs/jwt';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    AuthApiV1Module,
    RouterModule.register([{ path: 'v1', module: AuthApiV1Module }]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [],
  providers: [],
})
export class AuthApiModule {}
