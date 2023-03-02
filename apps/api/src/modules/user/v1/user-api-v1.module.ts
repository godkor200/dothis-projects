import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntityModule } from '@Apps/config/database/domain/user/UserModule';
import { MembershipModule } from '@Apps/config/database/domain/membership/MembershipModule';
import { GetUserHttpController } from '@Apps/modules/user/v1/commands/get-user/get-user.http.controller';
import { UserRepository } from './db/user.repository';
import { UserChannelDataModule } from '@Apps/config/database/domain/userChannelData/UserChannelDataModule';
import { GetUserCommandHandler } from '@Apps/modules/user/v1/commands/get-user/get-user.service';
import { GetChannelDataCommandHandler } from '@Apps/modules/user/v1/commands/get-channel-data/get-channel-data.service';
import { GetChannelDataHttpController } from '@Apps/modules/user/v1/commands/get-channel-data/get-channel-data.http.controller';
import { UserChannelDataRepository } from '@Apps/modules/user-channel-data/v1/db/user-channel-data.repository';
import { ChannelDataRepository } from '@Apps/modules/channel/v1/db/channel-data.repository';
import { USER_REPOSITORY } from '@Apps/modules/user/constants/user.di-token';
import { USER_CHANNEL_DATA_REPOSITORY } from '@Apps/modules/user-channel-data/user-channel-data.di-token';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/modules/channel/constants/channel-data.di-token.constants';

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
    UserEntityModule,
    MembershipModule,
    UserChannelDataModule,
  ],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers, ...queryHandlers],
})
export class UserApiV1Module {}
