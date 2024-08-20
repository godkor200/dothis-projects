import { ExceptionBase } from '@Libs/commons';

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
export class TodayIssueNotFoundError extends ExceptionBase {
  static readonly message = "Today's issue could not be found.";

  public readonly code = 'TODAY_ISSUE.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(TodayIssueNotFoundError.message, undefined, metadata);
  }
}
