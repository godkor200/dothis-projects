import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class RelwordsNotFoundError extends ExceptionBase {
  static readonly message = 'The relwords could not be found.';

  public readonly code = 'REL_WORDS.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(RelwordsNotFoundError.message, undefined, metadata);
  }
}
