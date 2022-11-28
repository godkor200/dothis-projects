import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelModule } from '@Libs/entity/src/domain/channel/ChannelModule';
import { ChannelApiService } from '../ChannelApi.service';

@Module({
  imports: [ChannelModule],
  controllers: [ChannelController],
  providers: [ChannelApiService],
})
export class ChannelApiV1Module {}
