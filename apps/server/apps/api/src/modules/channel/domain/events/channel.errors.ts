import { ExceptionBase } from '@Libs/commons';

export class ChannelNotFoundError extends ExceptionBase {
  static readonly message = 'Channel not found';

  public readonly code = 'CHANNEL.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(ChannelNotFoundError.message, cause, metadata);
  }
}

export class NoRegisteredChannelsError extends ExceptionBase {
  static readonly message = 'No registered channels available';

  public readonly code = 'CHANNEL.NO_REGISTERED_CHANNELS';

  constructor(cause?: Error, metadata?: unknown) {
    super(NoRegisteredChannelsError.message, cause, metadata);
  }
}
export class ChannelDuplicateError extends ExceptionBase {
  static readonly message = 'Channel already exists';

  public readonly code = 'CHANNEL.DUPLICATE';

  constructor(cause?: Error, metadata?: unknown) {
    super(ChannelDuplicateError.message, cause, metadata);
  }
}
