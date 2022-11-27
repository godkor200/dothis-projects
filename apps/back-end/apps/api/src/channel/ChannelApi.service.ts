import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from '@Libs/entity/src/domain/channel/Channel.entity';

@Injectable()
export class ChannelApiService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
  ) {}

  async findAll(): Promise<Channel[]> {
    return await this.channelRepository.find();
  }
}
