import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from '@Apps/modules/membership/domain/membership.entity';
import { User } from '@Apps/modules/user/domain/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Membership])],
  exports: [TypeOrmModule],
})
export class MembershipEntityModule {}
