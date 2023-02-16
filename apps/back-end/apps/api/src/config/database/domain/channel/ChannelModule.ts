import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './Channel.entity';
import { User } from '@Apps/api/src/config/database/domain/user/User.entity';
import { Video } from '@Apps/api/src/config/database/domain/videos/Videos.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Video, Channel])],
  exports: [TypeOrmModule],
  providers: [],
})
export class ChannelModule {}
