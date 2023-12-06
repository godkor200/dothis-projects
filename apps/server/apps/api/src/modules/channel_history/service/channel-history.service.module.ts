import { Module } from '@nestjs/common';
import { ChannelHistoryDataService } from '@Apps/modules/channel_history/service/channel-history-data.service';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/service/channel-history.aggregate.service';

@Module({
  providers: [ChannelHistoryDataService, ChannelHistoryAggregateService],
  exports: [ChannelHistoryDataService, ChannelHistoryAggregateService],
})
export class ChannelHistoryServiceModule {}
