import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { Subscribe } from '@Libs/entity/src/domain/subscribe/Subscribe.entity';
import { DailyViews } from '@Libs/entity/src/domain/daily_views/DailyViews.entity';
import { Channel } from '@Libs/entity/src/domain/channel/Channel.entity';
import { Video } from '@Libs/entity/src/domain/videos/Videos.entity';

const configService = new ConfigService();
config();
new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('MYSQL_ROOT_USER'),
  password: configService.get('MYSQL_ROOT_PASSWORD'),
  database: configService.get('DB_SCHEMA'),
  entities: [User, UserChannelData, Subscribe, DailyViews, Channel, Video],
  migrations: [__dirname + '/migrations/1674099525331-idChangeMigrations.ts'],
});
