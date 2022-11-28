import { Module } from '@nestjs/common';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import { UserApiV1Module } from './v1/UserApi-v1.module';

import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    UserApiV1Module,
    RouterModule.register([{ path: 'v1', module: UserApiV1Module }]),
  ],
  controllers: [],
  providers: [],
})
export class UserApiModule {}
