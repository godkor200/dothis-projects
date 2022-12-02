import { NestFactory } from '@nestjs/core';
import { AppModule } from '@Apps/api/src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
}
bootstrap();
