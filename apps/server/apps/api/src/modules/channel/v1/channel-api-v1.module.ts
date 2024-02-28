import { Module, Provider } from '@nestjs/common';
import { ChannelEntityModule } from 'apps/api/src/modules/channel/repository/entity/channel.entity.module';
import { GetDicSearchTermCommandHandler } from 'apps/api/src/modules/channel/v1/commands/get-dic-search-term/get-dic-searth-term.service';
import {
  CHANNEL_DATA_REPOSITORY,
  CHANNEL_OS_DI_TOKEN,
} from 'apps/api/src/modules/channel/constants/channel-data.di-token.constants';
import { ChannelDataRepository } from 'apps/api/src/modules/channel/repository/db/channel-data.repository';
import { CHANNEL_REPOSITORY } from '@Apps/modules/channel/channel.di-token';
import { ChannelRepository } from '@Apps/modules/channel/database/channel.repository';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/channel-history.di-token.constants';
import { ChannelHistoryQueryHandler } from '@Apps/modules/channel_history/repository/database/channel-history.query-handler';
import { AnalyzeChannelHttpController } from '@Apps/modules/channel/queries/v1/analyze-channel/analyze-channel.http.controller';
import { AtStrategy } from '@Libs/commons/src';
import { CqrsModule } from '@nestjs/cqrs';
import { AnalyzeChannelQueryHandler } from '@Apps/modules/channel/queries/v1/analyze-channel/analyze-channel.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { ChannelQueryHandler } from '@Apps/modules/channel/database/channel.query-handler';

const controllers = [AnalyzeChannelHttpController];
const repositories: Provider[] = [
  GetDicSearchTermCommandHandler,
  {
    provide: CHANNEL_DATA_REPOSITORY,
    useClass: ChannelDataRepository,
  },
  { provide: CHANNEL_REPOSITORY, useClass: ChannelRepository },
  {
    provide: CHANNEL_HISTORY_OS_DI_TOKEN,
    useClass: ChannelHistoryQueryHandler,
  },
  {
    provide: CHANNEL_OS_DI_TOKEN,
    useClass: ChannelQueryHandler,
  },
];
const strategies: Provider[] = [AtStrategy];
const queryHandlers: Provider[] = [AnalyzeChannelQueryHandler];

@Module({
  imports: [CqrsModule, AwsModule, ChannelEntityModule],
  controllers,
  providers: [...strategies, ...repositories, ...queryHandlers],
})
export class ChannelApiV1Module {}
