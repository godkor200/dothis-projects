import { Module } from '@nestjs/common';
import { User } from './User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannelData } from '@Apps/config/database/domain/userChannelData/UserChannelData.entity';
import { Membership } from '@Apps/config/database/domain/membership/Membership.entity';
import { Channel } from '@Apps/config/database/domain/channel/Channel.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserChannelData, Membership, Channel]),
  ],
  exports: [TypeOrmModule],
  providers: [],
})
export class UserEntityModule {}
