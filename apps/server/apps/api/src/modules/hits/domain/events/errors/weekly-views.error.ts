import { ExceptionBase } from '@Libs/commons';

export class WeeklyViewsError extends ExceptionBase {
  static readonly message = 'The weekly-hits data could not be found.';

  public readonly code = 'WEEKLY_VIEWS.NOT_BE_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(WeeklyViewsError.message, undefined, metadata);
  }
}
// 비디오 캐시가 없는 경우의 예외 클래스
export class VideoCacheNotFoundError extends ExceptionBase {
  static readonly message = 'The video cache data could not be found.';

  public readonly code = 'VIDEO_CACHE.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(VideoCacheNotFoundError.message, cause, metadata);
  }
}
