import { NestFactory } from '@nestjs/core';
import { AppModule } from '@Apps/api/src/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from '@Libs/commons/src/util/swagger';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from '@Libs/commons/src/filter/httpException.filter';

async function bootstrap() {
  console.log(process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8080);
}
bootstrap();
