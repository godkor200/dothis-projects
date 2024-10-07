import { ExceptionBase } from '@Libs/commons';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zVideoErrNotFound } from '@dothis/dto';

export class DuplicateException extends ExceptionBase {
  static readonly message =
    'The operatorId, videoId is a duplicate and cannot be added.';

  public readonly code = 'VIDEO.DUPLICATE';

  constructor(metadata?: unknown) {
    super(DuplicateException.message, undefined, metadata);
  }
}
export class InvalidYoutubeUrlException extends ExceptionBase {
  static readonly message =
    'The provided URL is not a valid YouTube video URL. Please provide a valid YouTube video URL.';

  public readonly code = 'URL.INVALID_YOUTUBE';

  constructor(metadata?: unknown) {
    super(InvalidYoutubeUrlException.message, undefined, metadata);
  }
}
export class VideoNotFoundException extends ExceptionBase {
  static readonly message = 'The video was not found.';

  public readonly code = 'VIDEO.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(VideoNotFoundException.message, undefined, metadata);
  }
}
export class VideoErrNotFound extends createZodDto(
  extendApi(zVideoErrNotFound),
) {}
export class YoutubeChannelServerErrorException extends ExceptionBase {
  static readonly message =
    'Fastapi Crawling Server 서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';

  public readonly code = 'SERVER.YOUTUBE_CHANNEL_ERROR';

  constructor(metadata?: unknown) {
    super(YoutubeChannelServerErrorException.message, undefined, metadata);
  }
}
