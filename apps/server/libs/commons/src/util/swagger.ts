import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('DOTHIS API')
  .setDescription('두디스 API 문서입니다.')
  .setVersion('0.0.1')
  .addCookieAuth('google_access_token')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: '토큰을 넣어주세요',
      in: 'header',
    },
    'Authorization',
  )
  .build();
