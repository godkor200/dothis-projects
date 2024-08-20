import { ExceptionBase } from '@Libs/commons';

export class ReferNotExistsError extends ExceptionBase {
  static readonly message = 'The reference does not exist';

  public readonly code = 'REFER.DOES_NOT_EXIST';

  constructor(cause?: Error, metadata?: unknown) {
    super(ReferNotExistsError.message, cause, metadata);
  }
}
