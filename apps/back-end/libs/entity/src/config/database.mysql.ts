import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/user/User.entity';
import { Channel } from '../domain/channel/Channel.entity';
import { DailyViews } from '../domain/daily_views/DailyViews.entity';
import { Inject } from '@nestjs/common';
import dbConfig from '@Libs/entity/src/config/db.env';
import { ConfigType } from '@nestjs/config';

export class createDatabaseConnection {
  // const entityPath = path.join(
  //   __dirname,
  //   `/../../libs/entity/src/domain/**/*.entity.js`,
  // );
  // console.log(entityPath);
  db;

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
      entities: [User, Channel, DailyViews],
      synchronize: false,
    });
  }
  set() {
    return this.db;
  }
}
