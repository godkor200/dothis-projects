import { NestFactory } from '@nestjs/core';
import { AppModule } from '@Apps/api/src/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from '@Libs/commons/src/util/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  patchNestjsSwagger();
  await app.listen(8080);
}
bootstrap();
