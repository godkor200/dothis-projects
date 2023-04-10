import { Module } from '@nestjs/common';
import { UserEntityModule } from '@Apps/config/database/domain/entities/user/user.entity.module';
import { UserApiV1Module } from './v1/user-api-v1.module';
import { RouterModule } from '@nestjs/core';
import { UserChannelDataModule } from '@Apps/config/database/domain/entities/userChannelData/userChannelDataModule';

@Module({
  imports: [
    UserEntityModule,
    UserApiV1Module,
    UserChannelDataModule,
    RouterModule.register([{ path: 'v1', module: UserApiV1Module }]),
  ],
})
export class UserApiModule {}
