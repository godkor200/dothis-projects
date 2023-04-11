import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from '@Apps/config/database/domain/entities/membership/membership.entity';
import { User } from '@Apps/modules/user/repository/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Membership])],
  exports: [TypeOrmModule],
})
export class MembershipEntityModule {}
