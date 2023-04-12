import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannelData } from '@Apps/config/database/domain/entities/userChannelData/userChannelData.entity';
import { Membership } from '@Apps/config/database/domain/entities/membership/membership.entity';
import { ChannelEntity } from '@Apps/modules/channel/repository/entity/channel.entity';

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
