import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannelData } from '@Apps/api/src/config/database/domain/userChannelData/UserChannelData.entity';
import { User } from '@Apps/api/src/config/database/domain/user/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserChannelData, User])],
  exports: [TypeOrmModule],
})
export class UserChannelDataModule {}
