import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ChannelHistoryV1Module } from '@Apps/modules/channel_history/interfaces/http/controllers/v1/channel-history-v1.module';

@Module({
  imports: [
    ChannelHistoryV1Module,
    RouterModule.register([{ path: 'v1', module: ChannelHistoryV1Module }]),
  ],
})
export class ChannelHistoryApiModule {}
