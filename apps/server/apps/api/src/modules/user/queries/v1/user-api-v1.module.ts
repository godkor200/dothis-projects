import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntityModule } from '@Apps/modules/user/domain/user.entity.module';
import { MembershipEntityModule } from '@Apps/modules/membership/domain/membership.entity.module';
import { GetUserHttpController } from '@Apps/modules/user/queries/v1/get-user/get-user.http.controller';
import { UserRepository } from '@Apps/modules/user/database/user.repository';
import { GetUserCommandHandler } from '@Apps/modules/user/queries/v1/get-user/get-user.service';
import { GetChannelDataCommandHandler } from '@Apps/modules/user/queries/v1/get-channel-data/get-channel-data.service';
import { GetChannelDataHttpController } from '@Apps/modules/user/queries/v1/get-channel-data/get-channel-data.http.controller';
import { ChannelDataRepository } from '@Apps/modules/channel/repository/db/channel-data.repository';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { ChannelEntityModule } from '@Apps/modules/channel/repository/entity/channel.entity.module';
import { UpdatePersonalTagHttpController } from '@Apps/modules/user/command/v1/update-personal-tag/update-personal-tag.http.controller';
import { UpdateAutoCompleteWordsCommandHandler } from '@Apps/modules/rel-words/command/v1/update-auto-complete-words/update-auto-complete-words.command-handler';
import { UpdatePersonalTagCommandHandler } from '@Apps/modules/user/command/v1/update-personal-tag/update-personal-tag.command-handler';

const httpControllers = [
  GetUserHttpController,
  GetChannelDataHttpController,
  UpdatePersonalTagHttpController,
];

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
  UpdatePersonalTagCommandHandler,
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
