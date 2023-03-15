import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SetDicTermCommand,
  SetDicTermCommandOutput,
} from '@Apps/modules/cache/v1/commands/set-dic-term/set-dic-term.command';
import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { CACHE_SET_DIC_TERM } from '@Apps/modules/cache/constants/cache.di-token';
import { SetDicTermAdaptor } from '@Apps/modules/cache/v1/commands/set-dic-term/set-dic-term.adaptor';
import { CHANNEL_TERM } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { GetDicSearchTermAdapter } from '@Apps/modules/channel/v1/commands/get-dic-search-term/get-dic-search-term.adapter';

@CommandHandler(SetDicTermCommand)
export class SetDicTermHandler
  implements ICommandHandler<SetDicTermCommand, SetDicTermCommandOutput>
{
  private readonly logger = new Logger(SetDicTermHandler.name);
  @Inject(CACHE_SET_DIC_TERM) private readonly command: SetDicTermAdaptor;

  @Inject(CHANNEL_TERM) private readonly getDicTermArr: GetDicSearchTermAdapter;

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
