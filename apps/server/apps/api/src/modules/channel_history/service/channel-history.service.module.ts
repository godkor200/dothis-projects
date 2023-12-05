import { Module } from '@nestjs/common';
import { ChannelHistoryDataService } from '@Apps/modules/channel_history/service/channel-history-data.service';

@Module({
  providers: [ChannelHistoryDataService],
  exports: [ChannelHistoryDataService],
})
export class ChannelHistoryServiceModule {}
