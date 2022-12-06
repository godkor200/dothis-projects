import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribe } from './Subscribe.entity';
import { User } from '@Libs/entity/src/domain/user/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscribe])],
  exports: [TypeOrmModule],
})
export class SubscribeModule {}
