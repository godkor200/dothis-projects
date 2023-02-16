import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '@Apps/api/src/config/database/domain/user/UserModule';
import { SubscribeModule } from '@Apps/api/src/config/database/domain/subscribe/SubscribeModule';
import { GetUserHttpController } from '@Apps/api/src/user/v1/commands/get-user/get-user.http.controller';
import { UserRepository } from './db/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@Apps/api/src/config/database/domain/user/User.entity';
import { Subscribe } from '@Apps/api/src/config/database/domain/subscribe/Subscribe.entity';
import { UserChannelData } from '@Apps/api/src/config/database/domain/userChannelData/UserChannelData.entity';
import { UserChannelDataModule } from '@Apps/api/src/config/database/domain/userChannelData/UserChannelDataModule';
import { GetUserCommandHandler } from '@Apps/api/src/user/v1/commands/get-user/get-user.service';
import { GetChannelDataCommandHandler } from '@Apps/api/src/user/v1/commands/get-channel-data/get-channel-data.service';
import { GetChannelDataHttpController } from '@Apps/api/src/user/v1/commands/get-channel-data/get-channel-data.http.controller';
import { UserChannelDataRepository } from '@Apps/api/src/user-channel-data/v1/db/user-channel-data.repository';
import { ChannelDataRepository } from '@Apps/api/src/channel/v1/db/channel-data.repository';
import { USER_REPOSITORY } from '@Apps/api/src/user/user.di-token';
import { USER_CHANNEL_DATA_REPOSITORY } from '@Apps/api/src/user-channel-data/user-channel-data.di-token';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/api/src/channel/channel-data.di-token';

const httpControllers = [GetUserHttpController, GetChannelDataHttpController];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  {
    provide: USER_CHANNEL_DATA_REPOSITORY,
    useClass: UserChannelDataRepository,
  },
  {
    provide: CHANNEL_DATA_REPOSITORY,
    useClass: ChannelDataRepository,
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
    // TypeOrmModule.forFeature([User, Subscribe, UserChannelData]),
  ],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers, ...queryHandlers],
})
export class UserApiV1Module {}
