import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class VideoDuplicateException extends ExceptionBase {
  static readonly message = 'The video is a duplicate and cannot be added.';

  public readonly code = 'VIDEO.DUPLICATE';

  constructor(metadata?: unknown) {
    super(VideoDuplicateException.message, undefined, metadata);
  }
}
