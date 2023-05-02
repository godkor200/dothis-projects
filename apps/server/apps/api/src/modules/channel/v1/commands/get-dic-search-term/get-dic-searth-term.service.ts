import { Inject, Injectable, Logger } from '@nestjs/common';
import { CHANNEL_DATA_REPOSITORY } from 'apps/api/src/modules/channel/constants/channel-data.di-token.constants';
import { ChannelDataRepositoryPort } from 'apps/api/src/modules/channel/repository/db/channel-data.repository.port';
@Injectable()
export class GetDicSearchTermCommandHandler {
  private readonly logger = new Logger(GetDicSearchTermCommandHandler.name);
  constructor(
    @Inject(CHANNEL_DATA_REPOSITORY)
    protected readonly channelDataRepo: ChannelDataRepositoryPort,
  ) {}

  async execute() {
    this.logger.log('탐색어 업데이트 시작합니다.');
    const arr = await this.channelDataRepo.findAll();
    return arr
      .map((ev) => [...ev.tag.split(','), ...ev.keyword.split(',')])
      .flat()
      .reduce((ac, v) => (ac.includes(v) ? ac : [...ac, v]), []);
  }
}
