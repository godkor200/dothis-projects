import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class StoryNotExistsError extends ExceptionBase {
  static readonly message = 'story not exists';

  public readonly code = 'story.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(StoryNotExistsError.message, cause, metadata);
  }
}
