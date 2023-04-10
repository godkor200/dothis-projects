import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '@Apps/config/database/domain/entities/user/user.entity';
import { UserChannelData } from '@Apps/config/database/domain/entities/UserChannelData/UserChannelData.entity';
import { Membership } from '@Apps/config/database/domain/entities/membership/membership.entity';
import { DailyViews } from '@Apps/config/database/domain/entities/daily_views/daily-views.entity';
import { ChannelEntity } from '@Apps/config/database/domain/entities/channel/channel.entity';
import { Video } from '@Apps/config/database/domain/entities/videos/videos.entity';

const configService = new ConfigService();
config();
export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('MYSQL_ROOT_USER'),
  password: configService.get('MYSQL_ROOT_PASSWORD'),
  database: configService.get('DB_SCHEMA'),
  entities: [
    User,
    UserChannelData,
    Membership,
    DailyViews,
    ChannelEntity,
    Video,
  ],
  migrations: [__dirname + '/migrations/1676006541148-migrations.ts'],
});
