import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class ChannelDuplicateException extends ExceptionBase {
  static readonly message = 'The channel is a duplicate and cannot be added.';

  public readonly code = 'CHANNEL.DUPLICATE';

  constructor(metadata?: unknown) {
    super(ChannelDuplicateException.message, undefined, metadata);
  }
}
