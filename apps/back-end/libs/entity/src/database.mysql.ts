import { TypeOrmModule } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dbConfig from '@Libs/entity/src/config/db.env';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { Subscribe } from '@Libs/entity/src/domain/subscribe/Subscribe.entity';
import { DailyViews } from '@Libs/entity/src/domain/daily_views/DailyViews.entity';
import { Channel } from '@Libs/entity/src/domain/channel/Channel.entity';
import { Video } from '@Libs/entity/src/domain/videos/Videos.entity';
export class createDatabaseConnection {
  constructor(
    @Inject(dbConfig.KEY) private config: ConfigType<typeof dbConfig>,
  ) {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.DB_HOST,
      port: Number(this.config.DB_PORT),
      username: 'root',
      password: this.config.MYSQL_ROOT_PASSWORD,
      database: this.config.DB_SCHEMA,
      entities: [User, UserChannelData, Subscribe, DailyViews, Channel, Video],
      synchronize: false,
    };
  }
}
