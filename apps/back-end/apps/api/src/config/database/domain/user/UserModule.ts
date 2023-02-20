import { Module } from '@nestjs/common';
import { User } from './User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannelData } from '@Apps/api/src/config/database/domain/userChannelData/UserChannelData.entity';
import { Membership } from '@Apps/api/src/config/database/domain/membership/Membership.entity';
import { Channel } from '@Apps/api/src/config/database/domain/channel/Channel.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserChannelData, Membership, Channel]),
  ],
  exports: [TypeOrmModule],
  providers: [],
})
export class UserEntityModule {}
