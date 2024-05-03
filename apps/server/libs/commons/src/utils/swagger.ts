import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('DOTHIS API')
  .setDescription(
    '두디스 API 문서입니다. 각 body response 등은 schema 텝을 잘 참고해주세요',
  )
  .setVersion('0.0.1')
  .addCookieAuth('google_access_token')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'bearer 제외한 엑세스 토큰을 넣어주세요',
      in: 'header',
    },
    'Authorization',
  )
  .build();
