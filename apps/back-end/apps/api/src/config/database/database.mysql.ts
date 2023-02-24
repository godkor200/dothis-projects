import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@Apps/config/database/domain/user/User.entity';
import { UserChannelData } from '@Apps/config/database/domain/userChannelData/UserChannelData.entity';
import { Membership } from '@Apps/config/database/domain/membership/Membership.entity';
import { DailyViews } from '@Apps/config/database/domain/daily_views/DailyViews.entity';
import { Channel } from '@Apps/config/database/domain/channel/Channel.entity';
import { Video } from '@Apps/config/database/domain/videos/Videos.entity';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('db.DB_HOST'),
      port: +this.configService.get<number>('db.DB_PORT'),
      username: this.configService.get('db.MYSQL_ROOT_USER'),
      password: this.configService.get('db.MYSQL_PASSWORD'),
      database: this.configService.get('db.DB_SCHEMA'),
      entities: [User, UserChannelData, Membership, DailyViews, Channel, Video],
      migrations: [__dirname + '/migrations/1676006541148-migrations.ts'],
      synchronize: false,
    };
  }
}

@Module({
  providers: [TypeOrmConfigService],
})
export class MySqlConfigModule {}
