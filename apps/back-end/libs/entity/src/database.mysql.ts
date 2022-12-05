import { TypeOrmModule } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dbConfig from '@Libs/entity/src/config/db.env';
import * as path from 'path';

export class createDatabaseConnection {
  entityPath = path.join(
    __dirname,
    `/../../libs/entity/src/domain/**/*.entity.js`,
  );

  private db;

  constructor(
    @Inject(dbConfig.KEY) private config: ConfigType<typeof dbConfig>,
  ) {
    this.db = TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.DB_HOST,
      port: Number(config.DB_PORT),
      username: 'root',
      password: config.MYSQL_ROOT_PASSWORD,
      database: config.DB_SCHEMA,
      entities: [this.entityPath],
      synchronize: false,
    });
  }
  set() {
    return this.db;
  }
}
