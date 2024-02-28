import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntityModule } from '@Apps/modules/user/domain/user.entity.module';
import { MembershipEntityModule } from '@Apps/modules/membership/domain/membership.entity.module';
import { UserRepository } from '@Apps/modules/user/database/user.repository';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import {
  CHANNEL_DATA_REPOSITORY,
  CHANNEL_DATA_REPOSITORY_BY_OS,
} from '@Apps/modules/channel/channel-data.di-token.constants';

import { GetKeywordByUserHttpController } from '@Apps/modules/user/queries/v2/get-keyword-byUser/get-keyword-byUser.http.controller';
import { GetUserV2CommandHandler } from '@Apps/modules/user/queries/v2/get-keyword-byUser/get-keyword-byUser.service';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { PutAgreePromotionHttpController } from '@Apps/modules/user/command/v1/put-agree-promotion/put-agree-promotion.http.controller';
import { PutAgreePromotionCommandHandler } from '@Apps/modules/user/command/v1/put-agree-promotion/put-agree-promotion.command-handler';
import { ChannelDataRepository } from '@Apps/modules/channel/infrastucture/repositories/channel-data.repository';
import { ChannelEntity } from '@Apps/modules/channel/infrastucture/entities/channel.entity';
import { ChannelQueryHandler } from '@Apps/modules/channel/infrastucture/adapters/channel.query-handler';

const httpControllers = [
  GetKeywordByUserHttpController,
  PutAgreePromotionHttpController,
];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: CHANNEL_DATA_REPOSITORY, useClass: ChannelDataRepository },
  { provide: CHANNEL_DATA_REPOSITORY_BY_OS, useClass: ChannelQueryHandler },
];

const commandHandlers: Provider[] = [
  GetUserV2CommandHandler,
  PutAgreePromotionCommandHandler,
];

const queryHandlers: Provider[] = [];
@Module({
  imports: [
    CqrsModule,
    UserEntityModule,
    MembershipEntityModule,
    AwsModule,
    ChannelEntity,
  ],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers, ...queryHandlers],
})
export class UserApiV2Module {}
