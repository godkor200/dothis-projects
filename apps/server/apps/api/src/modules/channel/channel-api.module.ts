import { Module } from '@nestjs/common';
import { ChannelEntityModule } from '@Apps/modules/channel/infrastucture/entities/channel.entity.module';
import { ChannelApiV1Module } from './v1/channel-api-v1.module';

import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ChannelEntityModule,
    ChannelApiV1Module,
    RouterModule.register([{ path: 'v1', module: ChannelApiV1Module }]),
  ],
})
export class ChannelApiModule {}
