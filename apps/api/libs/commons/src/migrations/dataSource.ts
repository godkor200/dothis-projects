import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '@Apps/config/database/domain/user/User.entity';
import { UserChannelData } from '@Apps/config/database/domain/userChannelData/UserChannelData.entity';
import { Membership } from '@Apps/config/database/domain/membership/Membership.entity';
import { DailyViews } from '@Apps/config/database/domain/daily_views/DailyViews.entity';
import { Channel } from '@Apps/config/database/domain/channel/Channel.entity';
import { Video } from '@Apps/config/database/domain/videos/Videos.entity';

const configService = new ConfigService();
config();
export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('MYSQL_ROOT_USER'),
  password: configService.get('MYSQL_ROOT_PASSWORD'),
  database: configService.get('DB_SCHEMA'),
  entities: [User, UserChannelData, Membership, DailyViews, Channel, Video],
  migrations: [__dirname + '/migrations/1676006541148-migrations.ts'],
});
