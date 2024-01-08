import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { MessageBuilder } from 'minimal-discord-webhook-node';
import { sendWebhook } from '@Libs/commons/src/util/hooks';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number }
      | { error: string; statusCode: 400; message: string[] }; // class-validator 타이핑

    if (typeof err !== 'string' && err.statusCode === 400) {
      // class-validator 발생 에러
      return response.status(status).json({
        success: false,
        ...err.message,
      });
    }

    if (err.statusCode > 429) {
      const hostHeaders = request.headers;

      const embed = new MessageBuilder()
        .setTitle(err.statusCode.toString())
        .addField('request id', RequestContextService.getRequestId())
        .addField('host referer:', hostHeaders.referer, true)
        .addField('user agent', hostHeaders['user-agent'], true)
        .addField('params', JSON.stringify(request.params))
        .addField('query', JSON.stringify(request.query))
        .setDescription(err.message)
        .setTimestamp();
      sendWebhook(embed);
    }

    // 사용자 정의 에러(HttpException, BadRequestException 등..)
    response.status(status).json({
      success: false,
      ...err,
    });
  }
}
