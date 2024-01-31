import { Module } from '@nestjs/common';
import { UserEntityModule } from '@Apps/modules/user/domain/user.entity.module';
import { UserApiV1Module } from './queries/v1/user-api.v1.module';
import { RouterModule } from '@nestjs/core';
import { UserApiV2Module } from '@Apps/modules/user/queries/v2/user-api.v2.module';

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
