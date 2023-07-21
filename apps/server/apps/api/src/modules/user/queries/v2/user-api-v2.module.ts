import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntityModule } from '@Apps/modules/user/domain/user.entity.module';
import { MembershipEntityModule } from '@Apps/modules/membership/domain/membership.entity.module';
import { UserRepository } from '@Apps/modules/user/database/user.repository';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { CHANNEL_DATA_REPOSITORY_BY_OS } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { ChannelQueryHandler } from '@Apps/modules/channel/repository/repository/channel.query-handler';
import { GetKeywordByUserHttpController } from '@Apps/modules/user/queries/v2/get-keyword-byUser/get-keyword-byUser.http.controller';
import { GetUserV2CommandHandler } from '@Apps/modules/user/queries/v2/get-keyword-byUser/get-keyword-byUser.service';
import { AwsModule } from '@Apps/common/aws/aws.module';

const httpControllers = [GetKeywordByUserHttpController];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: CHANNEL_DATA_REPOSITORY_BY_OS, useClass: ChannelQueryHandler },
];

const commandHandlers: Provider[] = [GetUserV2CommandHandler];

const queryHandlers: Provider[] = [];
@Module({
  imports: [CqrsModule, UserEntityModule, MembershipEntityModule, AwsModule],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers, ...queryHandlers],
})
export class UserApiV2Module {}
