import { Module } from '@nestjs/common';
import { ChannelHistoryDataService } from '@Apps/modules/channel-history/application/service/channel-history-data.service';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel-history/application/service/channel-history.aggregate.service';

@Module({
  providers: [ChannelHistoryDataService, ChannelHistoryAggregateService],
  exports: [ChannelHistoryDataService, ChannelHistoryAggregateService],
})
export class ChannelHistoryServiceModule {}
