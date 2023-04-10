import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannelData } from '@Apps/config/database/domain/entities/UserChannelData/UserChannelData.entity';
import { Membership } from '@Apps/config/database/domain/entities/membership/membership.entity';
import { ChannelEntity } from '@Apps/config/database/domain/entities/channel/channel.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserChannelData,
      Membership,
      ChannelEntity,
    ]),
  ],
  exports: [TypeOrmModule],
  providers: [],
})
export class UserEntityModule {}
