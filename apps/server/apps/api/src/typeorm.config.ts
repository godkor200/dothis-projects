import { config } from 'dotenv';
config({
  path: __dirname + `/../../../${process.env.NODE_ENV}.env`,
});
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DB_SCHEMA,
  logging: true,
  entities: [__dirname + './**/**/repositories/entities/*.entities.ts.'],
  migrationsRun: true,
  migrations: [__dirname + '/migrations/*.ts'],
});
