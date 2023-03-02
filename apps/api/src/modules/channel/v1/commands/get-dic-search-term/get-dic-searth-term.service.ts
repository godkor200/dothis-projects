import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { ChannelDataRepositoryPost } from '@Apps/modules/channel/v1/db/channel-data.repository.post';

@Injectable()
export class GetDicSearchTermCommandHandler {
  constructor(
    @Inject(CHANNEL_DATA_REPOSITORY)
    protected readonly channelDataRepo: ChannelDataRepositoryPost,
  ) {}
  async execute() {
    const arr = await this.channelDataRepo.findAll();
    return arr
      .map((ev) => [...ev.tag.split(','), ...ev.keyword.split(',')])
      .flat()
      .reduce((ac, v) => (ac.includes(v) ? ac : [...ac, v]), []);
  }
}
