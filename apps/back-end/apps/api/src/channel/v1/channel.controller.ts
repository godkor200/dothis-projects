import { Controller, Get } from '@nestjs/common';
import { ChannelApiService } from '../ChannelApi.service';

@Controller('/channel')
export class ChannelController {
  constructor(private readonly channelApiService: ChannelApiService) {}
  @Get('/')
  async getChannel() {
    return this.channelApiService.findAll();
  }
}
