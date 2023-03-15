import { Module } from '@nestjs/common';
import { C_ChannelEntityModule } from '@Apps/config/database/domain/entities/c_channel/c_channel.entity.module';
import { ChannelApiV1Module } from './v1/channel-api-v1.module';

import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    C_ChannelEntityModule,
    ChannelApiV1Module,
    RouterModule.register([{ path: 'v1', module: ChannelApiV1Module }]),
  ],
})
export class ChannelApiModule {}
