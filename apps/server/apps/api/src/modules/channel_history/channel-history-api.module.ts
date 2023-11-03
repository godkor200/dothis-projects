import { Module } from '@nestjs/common';
import { ChannelHistoryV1Module } from '@Apps/modules/channel_history/queries/v1/channel-history-v1.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ChannelHistoryV1Module,
    RouterModule.register([{ path: 'v1', module: ChannelHistoryV1Module }]),
  ],
})
export class ChannelHistoryApiModule {}
