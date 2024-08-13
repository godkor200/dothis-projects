import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { MessageBuilder } from 'minimal-discord-webhook-node';
import { sendWebhook } from '@Libs/commons/src/utils/hooks';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number }
      | { error: string; statusCode: 400; message: string[] }; // class-validator 타이핑

    // 현재 시간을 한국 시간으로 변환
    const currentTimeKST = dayjs()
      .tz('Asia/Seoul')
      .format('YYYY-MM-DD HH:mm:ss');

    if (typeof err !== 'string' && err.statusCode === 400) {
      // class-validator 발생 에러
      return response.status(status).json({
        success: false,
        message: err.message,
      });
    }

    if (err.statusCode > 429 && err.statusCode < 500) {
      const hostHeaders = request.headers;

      const embed = new MessageBuilder()
        .setTitle(err.statusCode.toString())
        .addField('request id', RequestContextService.getRequestId())
        .addField('host referer:', hostHeaders.referer, true)
        .addField('user agent', hostHeaders['user-agent'], true)
        .addField('params', JSON.stringify(request.params))
        .addField('query', JSON.stringify(request.query))
        .setDescription(err.message)
        .setTimestamp(); // 한국 시간으로 변환된 시간
      sendWebhook(embed);
      response.status(status).json({
        success: false,
        ...err,
        timestamp: currentTimeKST, // 한국 시간으로 변환된 시간 추가
      });
    }

    this.logger.error(`[${currentTimeKST}] ${err.message}`, exception.stack);
    // 사용자 정의 에러(HttpException, BadRequestException 등..)
    response.status(status).json({
      success: false,
      ...err,
      timestamp: currentTimeKST, // 한국 시간으로 변환된 시간 추가
    });
  }
}
