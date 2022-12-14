import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannelData } from './UserChannelData.entity';
import { User } from '@Libs/entity/src/domain/user/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserChannelData, User])],
  exports: [TypeOrmModule],
})
export class UserChannelDataModule {}
