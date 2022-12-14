import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './Channel.entity';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { Video } from '@Libs/entity/src/domain/videos/Videos.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Video, Channel])],
  exports: [TypeOrmModule],
  providers: [],
})
export class ChannelModule {}
