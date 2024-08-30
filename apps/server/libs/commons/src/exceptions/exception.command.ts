import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { InternalServerErrorException } from '@nestjs/common';
import { ExceptionBase } from './exception.base';
import { IRes } from '@Libs/types';

export class CommandExecutor {
  private commandBus: CommandBus;

  constructor(commandBus: CommandBus) {
    this.commandBus = commandBus;
  }

  async executeCommand<T, D = undefined>(
    command: T,
    errors: ExceptionBase[] = [],
  ): Promise<IRes<D>> {
    const result: Result<T, Error> = await this.commandBus.execute(command);
    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        // if (errors.some((error) => err instanceof error)) {
        //   throw new NotFoundException(err.message);
        // }
        throw new InternalServerErrorException(err.message);
      },
    });
  }
}
