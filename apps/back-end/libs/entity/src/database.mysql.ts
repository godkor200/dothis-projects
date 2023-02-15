import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { Subscribe } from '@Libs/entity/src/domain/subscribe/Subscribe.entity';
import { DailyViews } from '@Libs/entity/src/domain/daily_views/DailyViews.entity';
import { Channel } from '@Libs/entity/src/domain/channel/Channel.entity';
import { Video } from '@Libs/entity/src/domain/videos/Videos.entity';

export default (configService: ConfigService): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get('db.DB_HOST'),
    port: +configService.get<number>('db.DB_PORT'),
    username: configService.get('db.MYSQL_ROOT_USER'),
    password: configService.get('db.MYSQL_PASSWORD'),
    database: configService.get('db.DB_SCHEMA'),
    entities: [User, UserChannelData, Subscribe, DailyViews, Channel, Video],
    synchronize: false,
  };
  return options;
};
