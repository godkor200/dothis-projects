import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOSTNAME: process.env.REDIS_HOSTNAME ?? 'localhost',
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  REDIS_ON_PROMISE_PORT: process.env.REDIS_ON_PROMISE_PORT,
  REDIS_ON_PROMISE_HOSTNAME:
    process.env.REDIS_ON_PROMISE_HOSTNAME ?? 'localhost',
  REDIS_ON_PROMISE_PASSWORD: process.env.REDIS_ON_PROMISE_PASSWORD,
}));
