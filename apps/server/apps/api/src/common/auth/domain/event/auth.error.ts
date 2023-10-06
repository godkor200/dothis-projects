import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class UserNotFoundError extends ExceptionBase {
  static readonly message = 'The user could not be found.';

  public readonly code = 'USER.NOT_BE_FOUND';

  constructor(metadata?: unknown) {
    super(UserNotFoundError.message, undefined, metadata);
  }
}
//Authentication failed

export class UnauthorizedExceptionError extends ExceptionBase {
  static readonly message = 'Authentication failed';

  public readonly code = 'USER.AUTH_FAILDED';

  constructor(metadata?: unknown) {
    super(UnauthorizedExceptionError.message, undefined, metadata);
  }
}
