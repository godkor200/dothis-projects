import { DocumentBuilder } from '@nestjs/swagger';

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

export const externalConfig = new DocumentBuilder()
  .setTitle('DOTHIS EXTERNAL API')
  .setDescription(
    '두디스 제공 API 문서입니다.\n\n' +
      '토큰 인증 필요\n\n' +
      '잠금 아이콘이 표시된 보안 API 엔드포인트에 접근하려면 먼저 GET /api/auth/{token} 엔드포인트를 사용하여 액세스 토큰을 받아야 합니다. ' +
      '토큰을 받은 후, 이를 사용하여 인증하고 보안 엔드포인트를 잠금 해제할 수 있습니다.\n',
  )
  .setVersion('0.0.1')
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
