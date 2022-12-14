import { Module } from '@nestjs/common';
import { User } from './User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQueryRepository } from './UserQueryRepository';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { Subscribe } from '@Libs/entity/src/domain/subscribe/Subscribe.entity';
import { Channel } from '@Libs/entity/src/domain/channel/Channel.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserChannelData,
      Subscribe,
      Channel,
      UserQueryRepository,
    ]),
  ],
  exports: [TypeOrmModule],
  providers: [],
})
export class UserModule {}
