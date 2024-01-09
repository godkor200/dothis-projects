import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class ScrollApiError extends ExceptionBase {
  static readonly message = 'Opensearch scroll api error';

  public readonly code = 'OS.SCROLL_API';

  constructor(cause?: Error, metadata?: unknown) {
    super(ScrollApiError.message, cause, metadata);
  }
}
