import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@Apps/config/database/domain/entities/user/user.entity';
import { UserChannelData } from '@Apps/config/database/domain/entities/userChannelData/userChannelData.entity';
import { Membership } from '@Apps/config/database/domain/entities/membership/membership.entity';
import { DailyViews } from '@Apps/config/database/domain/entities/daily_views/daily-views.entity';
import { Video } from '@Apps/config/database/domain/entities/videos/videos.entity';
import { ChannelEntity } from '@Apps/config/database/domain/entities/channel/channel.entity';
import { RelatedWordsEntity } from './domain/entities/related_words/related_words.entity';

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
      entities: [
        User,
        UserChannelData,
        Membership,
        DailyViews,
        ChannelEntity,
        Video,
        RelatedWordsEntity,
      ],
      migrations: [__dirname + '/migrations/1676006541148-migrations.ts'],
      synchronize: false,
    };
  }
}

@Module({
  providers: [TypeOrmConfigService],
})
export class MySqlConfigModule {}
