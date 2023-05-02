import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  APP_PORT: process.env.APP_PORT,
  APP_HOSTNAME: process.env.HOSTNAME ?? 'localhost',
}));
