import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Membership } from '@Apps/modules/membership/domain/membership.entity';
import { DailyViewsEntity } from '@Apps/modules/hits/domain/entities/daily-views.entity';
import { User } from '@Apps/modules/user/domain/user.entity';
import { ChannelEntity } from '@Apps/modules/channel/infrastucture/entities/channel.entity';
import { VideoEntity } from '@Apps/modules/video/domain/entities/videos.entity';

const configService = new ConfigService();
config();
export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('MYSQL_ROOT_USER'),
  password: configService.get('MYSQL_ROOT_PASSWORD'),
  database: configService.get('DB_SCHEMA'),
  entities: [User, Membership, DailyViewsEntity, ChannelEntity, VideoEntity],
  migrations: [__dirname + '/migrations/1676006541148-migrations.ts'],
});
