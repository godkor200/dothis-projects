import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class StoryNotExistsError extends ExceptionBase {
  static readonly message = 'The story does not exist';

  public readonly code = 'STORY.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(StoryNotExistsError.message, cause, metadata);
  }
}
