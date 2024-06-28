import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class VideoNotFoundError extends ExceptionBase {
  static readonly message = 'The video could not be found.';

  public readonly code = 'VIDEO.NOT_BE_FOUND';

  constructor(metadata?: unknown) {
    super(VideoNotFoundError.message, undefined, metadata);
  }
}

export class RelatedVideoNotFoundError extends ExceptionBase {
  static readonly message =
    'Related videos for the given criteria could not be found.';

  public readonly code = 'RELATED_VIDEO.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(RelatedVideoNotFoundError.message, undefined, metadata);
  }
}
