import { Module } from '@nestjs/common';
import { User } from './User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannelData } from '@Apps/api/src/config/database/domain/userChannelData/UserChannelData.entity';
import { Subscribe } from '@Apps/api/src/config/database/domain/subscribe/Subscribe.entity';
import { Channel } from '@Apps/api/src/config/database/domain/channel/Channel.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserChannelData, Subscribe, Channel]),
  ],
  exports: [TypeOrmModule],
  providers: [],
})
export class UserModule {}
