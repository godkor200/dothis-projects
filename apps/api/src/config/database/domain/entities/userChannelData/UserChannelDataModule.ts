import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannelData } from '@Apps/config/database/domain/entities/UserChannelData/UserChannelData.entity';
import { User } from '@Apps/config/database/domain/entities/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserChannelData, User])],
  exports: [TypeOrmModule],
})
export class UserChannelDataModule {}
