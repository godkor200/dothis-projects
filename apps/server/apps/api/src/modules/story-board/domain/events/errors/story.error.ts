import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zErrNotFound } from '@dothis/dto/dist/lib/error.response.zod';

export class StoryNotExistsError extends ExceptionBase {
  static readonly message = 'The story does not exist';

  public readonly code = 'STORY.DOES_NOT_EXIST';

  constructor(cause?: Error, metadata?: unknown) {
    super(StoryNotExistsError.message, cause, metadata);
  }
}

export class NotFoundErr extends createZodDto(extendApi(zErrNotFound)) {}
