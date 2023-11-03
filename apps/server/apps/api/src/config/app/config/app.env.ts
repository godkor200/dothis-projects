import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('app', () => ({
  APP_PORT: process.env.APP_PORT,
  APP_HOSTNAME: process.env.HOSTNAME ?? 'localhost',
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
}));
