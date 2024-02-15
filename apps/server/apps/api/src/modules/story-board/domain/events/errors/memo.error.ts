import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class MemoNotExistsError extends ExceptionBase {
  static readonly message = 'The memo does not exist';

  public readonly code = 'MEMO.DOES_NOT_EXIST';

  constructor(cause?: Error, metadata?: unknown) {
    super(MemoNotExistsError.message, cause, metadata);
  }
}
