import { NestFactory } from '@nestjs/core';
import { AppModule } from 'apps/api/src/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from '@Libs/commons/src/utils/swagger';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from '@Libs/commons/src/filter/httpException.filter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaConfigService } from '@Apps/common/kafka/service/kafka.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const databaseUri: string = configService.get<string>('db.DB_HOST');
  const appPort = configService.get<number | string>('app.APP_PORT');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // const kafkaService = new KafkaConfigService(configService).getKafkaOptions();
  const logger = new Logger();
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: [
      'http://localhost:3666',
      'https://www.dothis.kr',
      'https://dothis.kr',
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  // app.connectMicroservice<MicroserviceOptions>(kafkaService);
  //await app.startAllMicroservices();
  await app.listen(appPort);
  // Kafka 마이크로서비스 생성 및 실행

  logger.log(`==========================================================`);

  logger.log(`Environment Variable`, process.env.NODE_ENV);

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
