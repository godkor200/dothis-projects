import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SetDicTermCommand,
  SetDicTermCommandOutput,
} from '@Apps/modules/related-word/application/dtos/set-dic-term.command';
import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';

import { SetSearchTermOutboundPort } from '@Apps/modules/related-word/domain/ports/set-search-term.outbound.port';
import { CHANNEL_TERM } from '@Apps/modules/channel/channel-data.di-token.constants';
import { GetDicSearchTermAdapter } from '@Apps/modules/channel/domain/ports/get-dic-search-term.adapter';
import { CACHE_SET_DIC_TERM } from '@Apps/modules/related-word/related-words.enum.di-token.constant';

@CommandHandler(SetDicTermCommand)
export class SetDicTermHandler
  implements ICommandHandler<SetDicTermCommand, SetDicTermCommandOutput>
{
  private readonly logger = new Logger(SetDicTermHandler.name);
  constructor(
    @Inject(CACHE_SET_DIC_TERM)
    private readonly command: SetSearchTermOutboundPort,

    @Inject(CHANNEL_TERM)
    private readonly getDicTermArr: GetDicSearchTermAdapter,
  ) {}

  async execute(command: SetDicTermCommand): Promise<SetDicTermCommandOutput> {
    const dicTermArray = await this.getDicTermArr.execute();
    if (!dicTermArray || dicTermArray.length === 0) {
      this.logger.error('탐색어 업데이트가 실패했습니다.');
      throw new HttpException('Not Found dicTermArray', HttpStatus.NOT_FOUND);
    }
    this.logger.log('탐색어 업데이트가 성공했습니다.');
    return await this.command.setDicTerm(dicTermArray);
  }
}
