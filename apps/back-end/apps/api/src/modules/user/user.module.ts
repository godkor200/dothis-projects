import { Module } from '@nestjs/common';
import { UserEntityModule } from '@Apps/api/src/config/database/domain/user/UserModule';
import { UserApiV1Module } from './v1/user-api-v1.module';
import { RouterModule } from '@nestjs/core';
import { UserChannelDataModule } from '@Apps/api/src/config/database/domain/userChannelData/UserChannelDataModule';

@Module({
  imports: [
    UserEntityModule,
    UserApiV1Module,
    UserChannelDataModule,
    RouterModule.register([{ path: 'v1', module: UserApiV1Module }]),
  ],
})
export class UserApiModule {}
