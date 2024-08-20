import { ExceptionBase } from '@Libs/commons';

export class VideoHistoryNotFoundError extends ExceptionBase {
  static readonly message = 'The video history could not be found.';

  public readonly code = 'VIDEO_HISTORY.NOT_BE_FOUND';

  constructor(metadata?: unknown) {
    super(VideoHistoryNotFoundError.message, undefined, metadata);
  }
}
