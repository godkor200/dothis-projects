import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zVideoErrNotFound } from '@dothis/dto';

export class VideoDuplicateException extends ExceptionBase {
  static readonly message = 'The video is a duplicate and cannot be added.';

  public readonly code = 'VIDEO.DUPLICATE';

  constructor(metadata?: unknown) {
    super(VideoDuplicateException.message, undefined, metadata);
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
