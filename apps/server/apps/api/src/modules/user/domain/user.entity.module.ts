import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from '@Apps/modules/membership/domain/membership.entity';
import { ChannelEntity } from '@Apps/modules/channel/infrastucture/entities/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Membership, ChannelEntity])],
  exports: [TypeOrmModule],
  providers: [],
})
export class UserEntityModule {}
