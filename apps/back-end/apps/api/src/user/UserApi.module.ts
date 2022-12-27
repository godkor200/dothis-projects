import { Module } from '@nestjs/common';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import { UserApiV1Module } from './v1/UserApi-v1.module';
import { RouterModule } from '@nestjs/core';
import { UserChannelDataModule } from '@Libs/entity/src/domain/userChannelData/UserChannelDataModule';

@Module({
  imports: [
    UserModule,
    UserApiV1Module,
    UserChannelDataModule,
    RouterModule.register([{ path: 'v1', module: UserApiV1Module }]),
  ],
})
export class UserApiModule {}
