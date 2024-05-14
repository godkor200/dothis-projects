import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('kafka', () => ({
  KAFKA_ENDPOINT1: process.env.KAFKA_ENDPOINT1,
  KAFKA_ENDPOINT2: process.env.KAFKA_ENDPOINT2,
  KAFKA_ENDPOINT3: process.env.KAFKA_ENDPOINT3,

  KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID,
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
}));
