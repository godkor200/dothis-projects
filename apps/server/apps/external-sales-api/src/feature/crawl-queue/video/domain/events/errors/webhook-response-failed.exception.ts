import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export interface FailureDetail {
  requestIndex: number;
  webhookUrl: string;
  token: string;
  message: string;
}

export class WebhookResponseFailedException extends HttpException {
  constructor(failures: FailureDetail[]) {
    super(
      {
        statusCode: HttpStatus.BAD_GATEWAY,
        message: 'Some requests failed',
        failures,
      },
      HttpStatus.BAD_GATEWAY,
    );
  }
}

export class WebhookUrlTokenMismatchException extends ExceptionBase {
  static readonly message =
    'Incoming token does not match the initially registered webhook URL token.';

  public readonly code = 'WEBHOOK.URL_TOKEN_MISMATCH';

  constructor(metadata?: unknown) {
    super(WebhookUrlTokenMismatchException.message, undefined, metadata);
  }
}
