import { TypeOrmModule } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dbConfig from '@Libs/entity/src/config/db.env';
import * as path from 'path';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { Subscribe } from '@Libs/entity/src/domain/subscribe/Subscribe.entity';
import { DailyViews } from '@Libs/entity/src/domain/daily_views/DailyViews.entity';
import { Channel } from '@Libs/entity/src/domain/channel/Channel.entity';
import { Video } from '@Libs/entity/src/domain/videos/Videos.entity';
export class createDatabaseConnection {
  entityPath = path.join(
    __dirname,
    `/../../libs/entity/src/domain/**/*.entity.ts`,
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
      entities: [User, UserChannelData, Subscribe, DailyViews, Channel, Video],
      synchronize: false,
    });
  }
  set() {
    console.log(this.entityPath);
    return this.db;
  }
}
