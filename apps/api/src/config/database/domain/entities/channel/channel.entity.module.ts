import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { User } from '@Apps/config/database/domain/entities/user/user.entity';
import { Video } from '@Apps/config/database/domain/entities/videos/videos.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Video, Channel])],
  exports: [TypeOrmModule],
  providers: [],
})
export class ChannelEntityModule {}
