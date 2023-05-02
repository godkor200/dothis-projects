import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from 'apps/api/src/config/database/domain/entities/membership/membership.entity';
import { ChannelEntity } from 'apps/api/src/modules/channel/repository/entity/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Membership, ChannelEntity])],
  exports: [TypeOrmModule],
  providers: [],
})
export class UserEntityModule {}
