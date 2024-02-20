import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class WeeklyViewsError extends ExceptionBase {
  static readonly message = 'The weekly-hits data could not be found.';

  public readonly code = 'WEEKLY_VIEWS.NOT_BE_FOUND';

  constructor(metadata?: unknown) {
    super(WeeklyViewsError.message, undefined, metadata);
  }
}
