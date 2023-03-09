import { ICommandHandler } from '@nestjs/cqrs';
import { SetDicTermCommand } from '@Apps/modules/cache/v1/commands/set-dic-term/set-dic-term.command';
import { Inject } from '@nestjs/common';
import { CACHE_SET_DIC_TERM } from '@Apps/modules/cache/constants/cache.di-token';
import { SetDicTermAdaptor } from '@Apps/modules/cache/v1/commands/set-dic-term/set-dic-term.adaptor';

export class SetDicTermHandler
  implements ICommandHandler<string[], SetDicTermCommand>
{
  @Inject(CACHE_SET_DIC_TERM) private readonly command: SetDicTermAdaptor;
  execute(command: string[]): Promise<SetDicTermCommand> {
    return this.command.setDicTerm(command);
  }
}
