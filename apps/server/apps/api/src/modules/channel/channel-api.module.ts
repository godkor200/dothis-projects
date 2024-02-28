import { Module } from '@nestjs/common';
import { ChannelEntityModule } from '@Apps/modules/channel/infrastucture/entities/channel.entity.module';

import { RouterModule } from '@nestjs/core';
import { ChannelApiV1Module } from '@Apps/modules/channel/channel.v1.module';

@Module({
  imports: [
    ChannelEntityModule,
    ChannelApiV1Module,
    RouterModule.register([{ path: 'v1', module: ChannelApiV1Module }]),
  ],
})
export class ChannelApiModule {}
