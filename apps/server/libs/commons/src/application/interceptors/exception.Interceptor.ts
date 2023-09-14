import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';
import { catchError, tap, throwError } from 'rxjs';
import { ApiErrorResponse } from '@Libs/commons/api-error.response';
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();

    /**
     * Setting an ID in the global context for each request.
     * This ID can be used as correlation id shown in logs
     */
    const requestId = request?.body?.requestId ?? nanoid(6);

    RequestContextService.setRequestId(requestId);
    return next.handle().pipe(
      catchError((err) => {
        // Logging for debugging purposes
        if (err.status >= 400 && err.status < 500) {
          this.logger.debug(
            `[${RequestContextService.getRequestId()}] ${err.message}`,
          );

          const isClassValidatorError =
            Array.isArray(err?.response?.message) &&
            typeof err?.response?.error === 'string' &&
            err.status === 400;
          // Transforming class-validator errors to a different format
          if (isClassValidatorError) {
            err = new BadRequestException(
              new ApiErrorResponse({
                statusCode: err.status,
                message: 'Validation error',
                error: err?.response?.error,
                subErrors: err?.response?.message,
                correlationId: RequestContextService.getRequestId(),
              }),
            );
            // Adding request ID to error message
            if (!err.correlationId) {
              err.correlationId = RequestContextService.getRequestId();
            }

            if (err.response) {
              err.response.correlationId = err.correlationId;
            }

            return throwError(err);
          }
        }
      }),
    );
  }
}
