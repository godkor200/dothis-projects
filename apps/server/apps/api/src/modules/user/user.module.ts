import { Module } from '@nestjs/common';
import { UserEntityModule } from 'apps/api/src/modules/user/repository/entity/user.entity.module';
import { UserApiV1Module } from './v1/user-api-v1.module';
import { RouterModule } from '@nestjs/core';
import { UserApiV2Module } from '@Apps/modules/user/v2/user-api-v2.module';

@Module({
  imports: [
    UserEntityModule,
    UserApiV1Module,
    UserApiV2Module,
    RouterModule.register([{ path: 'v1', module: UserApiV1Module }]),
    RouterModule.register([{ path: 'v2', module: UserApiV2Module }]),
  ],
})
export class UserApiModule {}
