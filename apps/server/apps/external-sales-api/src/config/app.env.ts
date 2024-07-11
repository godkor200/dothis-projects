import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  APP_PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  DOTHIS_SECRET_KEY: process.env.DOTHIS_SECRET_KEY,
}));
