import { Module } from '@nestjs/common';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import { UserApiController } from './UserApi.controller';
import { UserApiService } from '../UserApi.service';
import { UserApiQueryRepository } from '../UserApiQueryRepository';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { Subscribe } from '@Libs/entity/src/domain/subscribe/Subscribe.entity';
import { UserChannelData } from '@Libs/entity/src/domain/UserChannelData/UserChannelData.entity';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, UserChannelData, Subscribe]),
  ],
  controllers: [UserApiController],
  providers: [UserApiService, UserApiQueryRepository],
})
export class UserApiV1Module {}
