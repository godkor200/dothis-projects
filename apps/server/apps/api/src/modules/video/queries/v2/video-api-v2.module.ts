import { Module, Provider } from '@nestjs/common';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryQueryHandler } from '@Apps/modules/channel_history/database/channel-history.query-handler';
import { FindAccumulateVideosV2QueryHandler } from '@Apps/modules/video/queries/v2/find-accumulate-videos/find-accumulate-videos.query-handler';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/service/channel-history.aggregate.service';
import { FindAccumulateVideosV2HttpController } from '@Apps/modules/video/queries/v2/find-accumulate-videos/find-accumulate-videos.http.controller';
import { ChannelHistoryDataService } from '@Apps/modules/channel_history/service/channel-history-data.service';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/service/channel-history.service.module';

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [
  {
    provide: CHANNEL_HISTORY_OS_DI_TOKEN,
    useClass: ChannelHistoryQueryHandler,
  },
  FindAccumulateVideosV2QueryHandler,
  ChannelHistoryAggregateService,
];
@Module({
  imports: [CqrsModule, AwsModule, ChannelHistoryServiceModule],
  controllers: [FindAccumulateVideosV2HttpController],
  providers: [...queryHandlers, ...commandHandlers],
})
export class VideoApiV2Module {}
