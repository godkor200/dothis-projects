import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ChannelHistoryV1Module } from '@Apps/modules/channel_history/interfaces/http/queries/v1/channel-history-v1.module';
import { ChannelHistoryV2Module } from '@Apps/modules/channel_history/interfaces/http/queries/v2/channel-history-v2.module';

@Module({
  imports: [
    ChannelHistoryV1Module,
    ChannelHistoryV2Module,
    RouterModule.register([{ path: 'v1', module: ChannelHistoryV1Module }]),
    RouterModule.register([{ path: 'v2', module: ChannelHistoryV2Module }]),
  ],
})
export class ChannelHistoryApiModule {}
