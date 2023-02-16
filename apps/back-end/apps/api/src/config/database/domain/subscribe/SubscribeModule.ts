import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribe } from '@Apps/api/src/config/database/domain/subscribe/Subscribe.entity';
import { User } from '@Apps/api/src/config/database/domain/user/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscribe])],
  exports: [TypeOrmModule],
})
export class SubscribeModule {}
