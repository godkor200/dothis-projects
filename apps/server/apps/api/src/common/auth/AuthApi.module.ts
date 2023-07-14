import { Module } from '@nestjs/common';
import { UserEntityModule } from '@Apps/modules/user/repository/entity/user.entity.module';
import { AuthApiV1Module } from './v1/AuthApi-v1.module';
import { JwtModule } from '@nestjs/jwt';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserEntityModule,
    AuthApiV1Module,
    RouterModule.register([{ path: 'v1', module: AuthApiV1Module }]),
    // JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [],
  providers: [],
})
export class AuthApiModule {}
