import { Module } from '@nestjs/common';
import { AwsModule } from '@Apps/common/aws/aws.module';

import { ChannelHistoryDataService } from '@Apps/modules/channel-history/application/service/channel-history-data.service';

@Module({
  imports: [AwsModule],
  providers: [ChannelHistoryDataService],
})
export class ChannelHistoryDatabaseModule {}
