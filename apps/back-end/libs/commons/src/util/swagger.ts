import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('DOTHIS API')
  .setDescription('')
  .setVersion('0.0.1')
  .build();
