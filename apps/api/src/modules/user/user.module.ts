import { Module } from '@nestjs/common';
import { UserEntityModule } from '@Apps/modules/user/repository/entity/user.entity.module';
import { UserApiV1Module } from './v1/user-api-v1.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserEntityModule,
    UserApiV1Module,
    RouterModule.register([{ path: 'v1', module: UserApiV1Module }]),
  ],
})
export class UserApiModule {}
