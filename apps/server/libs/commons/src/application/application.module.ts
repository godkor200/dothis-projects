import { Module } from '@nestjs/common';
import { ExceptionInterceptor } from './interceptors/exception.Interceptor';
import { ContextInterceptor } from './context/context.interceptor';

@Module({
  providers: [ExceptionInterceptor, ContextInterceptor],
})
export class ApplicationModule {}
