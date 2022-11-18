import { Module } from '@nestjs/common';
import { User } from './User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQueryRepository } from './UserQueryRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserQueryRepository])],
  exports: [TypeOrmModule],
  providers: [],
})
export class UserModule {}
