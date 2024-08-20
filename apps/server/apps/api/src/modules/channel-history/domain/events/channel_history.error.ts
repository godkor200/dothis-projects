import { ExceptionBase } from '@Libs/commons';

export class ChannelHistoryNotFoundError extends ExceptionBase {
  static readonly message = 'Channel history not found';

  public readonly code = 'CHANNEL_HISTORY.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(ChannelHistoryNotFoundError.message, cause, metadata);
  }
}
