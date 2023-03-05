import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOSTNAME: process.env.REDIS_HOSTNAME ?? 'localhost',
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
}));
