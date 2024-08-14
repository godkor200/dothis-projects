import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('db', () => ({
  MYSQL_ROOT_USER: process.env.MYSQL_ROOT_USER,
  MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,

  DB_PORT: process.env.DB_PORT,
  DB_HOST: !process.env.DB_HOST ? 'localhost' : process.env.DB_HOST,
  DB_SCHEMA: process.env.DB_SCHEMA,

  ONPROMISES_DB_HOST: process.env.ONPROMISES_DB_HOST,
  ONPROMISES_DB_PORT: process.env.ONPROMISES_DB_PORT,
  ONPROMISES_MYSQL_ROOT_USER: process.env.ONPROMISES_MYSQL_ROOT_USER,
  ONPROMISES_MYSQL_ROOT_PASSWORD: process.env.ONPROMISES_MYSQL_ROOT_PASSWORD,
  ONPROMISES_DB_SCHEMA: process.env.ONPROMISES_DB_SCHEMA,
}));
