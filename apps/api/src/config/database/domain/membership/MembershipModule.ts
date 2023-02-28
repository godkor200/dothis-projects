import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from '@Apps/config/database/domain/membership/Membership.entity';
import { User } from '@Apps/config/database/domain/user/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Membership])],
  exports: [TypeOrmModule],
})
export class MembershipModule {}
