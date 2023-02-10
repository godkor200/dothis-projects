import { Module } from '@nestjs/common';
import { ChannelModule } from '@Libs/entity/src/domain/channel/ChannelModule';
import { ChannelApiV1Module } from './v1/channel-api-v1.module';

import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ChannelModule,
    ChannelApiV1Module,
    RouterModule.register([{ path: 'v1', module: ChannelApiV1Module }]),
  ],
})
export class ChannelApiModule {}
