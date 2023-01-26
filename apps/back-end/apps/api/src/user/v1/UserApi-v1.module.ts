import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import { SubscribeModule } from '@Libs/entity/src/domain/subscribe/SubscribeModule';
import { GetUserHttpController } from '@Apps/api/src/user/v1/commands/get-user/get-user.http.controller';
import { UserRepository } from './db/user.repository';
import { ConfigModule } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { Subscribe } from '@Libs/entity/src/domain/subscribe/Subscribe.entity';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { UserChannelDataModule } from '@Libs/entity/src/domain/userChannelData/UserChannelDataModule';
import { USER_REPOSITORY } from '@Apps/api/src/user/user.di-token';
import { GetUserCommandHandler } from '@Apps/api/src/user/v1/commands/get-user/get-user.service';
import { GetChannelDataCommandHandler } from '@Apps/api/src/user/v1/commands/get-channel-data/get-channel-data.service';
import { GetChannelDataHttpController } from '@Apps/api/src/user/v1/commands/get-channel-data/get-channel-data.http.controller';
import { USER_CHANNEL_DATA_REPOSITORY } from '@Apps/api/src/user-channel-data/user-channel-data.di-token';
import { UserChannelDataRepository } from '@Apps/api/src/user-channel-data/v1/db/user-channel-data.repository';

const httpControllers = [GetUserHttpController, GetChannelDataHttpController];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  {
    provide: USER_CHANNEL_DATA_REPOSITORY,
    useClass: UserChannelDataRepository,
  },
];

const commandHandlers: Provider[] = [
  GetChannelDataCommandHandler,
  GetUserCommandHandler,
];

const queryHandlers: Provider[] = [];
@Module({
  imports: [
    CqrsModule,
    UserModule,
    SubscribeModule,
    UserChannelDataModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Subscribe, UserChannelData]),
  ],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers, ...queryHandlers],
})
export class UserApiV1Module {}
