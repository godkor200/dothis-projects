import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('DOTHIS API')
  .setDescription('두디스 API 문서입니다.')
  .setVersion('0.0.1')
  .addCookieAuth('google_access_token')
  .addBearerAuth()
  .build();
