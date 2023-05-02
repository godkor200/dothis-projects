import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntityModule } from 'apps/api/src/modules/user/repository/entity/user.entity.module';
import { MembershipEntityModule } from 'apps/api/src/config/database/domain/entities/membership/membership.entity.module';
import { GetUserHttpController } from 'apps/api/src/modules/user/v1/commands/get-user/get-user.http.controller';
import { UserRepository } from '../repository/db/user.repository';
import { GetUserCommandHandler } from 'apps/api/src/modules/user/v1/commands/get-user/get-user.service';
import { GetChannelDataCommandHandler } from 'apps/api/src/modules/user/v1/commands/get-channel-data/get-channel-data.service';
import { GetChannelDataHttpController } from 'apps/api/src/modules/user/v1/commands/get-channel-data/get-channel-data.http.controller';
import { ChannelDataRepository } from 'apps/api/src/modules/channel/repository/db/channel-data.repository';
import { USER_REPOSITORY } from 'apps/api/src/modules/user/constants/user.di-token';
import { CHANNEL_DATA_REPOSITORY } from 'apps/api/src/modules/channel/constants/channel-data.di-token.constants';
import { ChannelEntityModule } from 'apps/api/src/modules/channel/repository/entity/channel.entity.module';

const httpControllers = [GetUserHttpController, GetChannelDataHttpController];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
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
    MembershipEntityModule,
    ChannelEntityModule,
  ],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers, ...queryHandlers],
})
export class UserApiV1Module {}
