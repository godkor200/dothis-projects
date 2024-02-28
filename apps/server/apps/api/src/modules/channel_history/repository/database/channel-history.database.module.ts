import { Module } from '@nestjs/common';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { ChannelHistoryQueryHandler } from '@Apps/modules/channel_history/repository/database/channel-history.query-handler';
import { ChannelHistoryDataService } from '@Apps/modules/channel_history/service/channel-history-data.service';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/channel-history.di-token.constants';

@Module({
  imports: [AwsModule],
  providers: [
    ChannelHistoryDataService,
    {
      provide: CHANNEL_HISTORY_OS_DI_TOKEN,
      useClass: ChannelHistoryQueryHandler,
    },
  ],
})
export class ChannelHistoryDatabaseModule {}
