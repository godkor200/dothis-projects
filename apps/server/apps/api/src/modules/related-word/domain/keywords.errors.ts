import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class KeywordsNotFoundError extends ExceptionBase {
  static readonly message = 'The keywords could not be found.';

  public readonly code = 'KEYWORDS.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(KeywordsNotFoundError.message, undefined, metadata);
  }
}
