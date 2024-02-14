import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

import { nestControllerContract } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
const c = nestControllerContract(apiRouter.dailyViews);

export class VideoNotFoundError extends ExceptionBase {
  static readonly message = 'The video could not be found.';

  public readonly code = 'VIDEO.NOT_BE_FOUND';

  constructor(metadata?: unknown) {
    super(VideoNotFoundError.message, undefined, metadata);
  }
}
