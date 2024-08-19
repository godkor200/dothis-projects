import { registerAs } from '@nestjs/config';
import process from 'node:process';

export default registerAs('app', () => ({
  APP_PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  DOTHIS_SECRET_KEY: process.env.DOTHIS_SECRET_KEY,
  SQUADX_API_TOKEN: process.env.SQUADX_API_TOKEN,
  SQUADX_API_URL: process.env.SQUADX_API_URL,
  GOOGLE_APIKEY: process.env.GOOGLE_APIKEY,
}));
