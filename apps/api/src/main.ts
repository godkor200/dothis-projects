import { NestFactory } from '@nestjs/core';
import { AppModule } from '@Apps/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from '@Libs/commons/src/util/swagger';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from '@Libs/commons/src/filter/httpException.filter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { timeout } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const databaseUri: string = configService.get<string>('db.DB_HOST');
  const appPort = configService.get<number | string>('app.APP_PORT');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const logger = new Logger();
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(appPort);

  logger.log(`==========================================================`);

  logger.log(`Environment Variable`, process.env.NODE_ENV);
  logger.log('NestApplication');

  logger.log(`==========================================================`);

  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  logger.log(`Database uri ${databaseUri}`, 'NestApplication');

  logger.log(`==========================================================`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
