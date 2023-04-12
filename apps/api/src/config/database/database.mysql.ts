import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Membership } from '@Apps/config/database/domain/entities/membership/membership.entity';
import { DailyViewsEntity } from '@Apps/modules/daily_views/repository/entity/daily-views.entity';

import { User } from '@Apps/modules/user/repository/entity/user.entity';
import { RelatedWordsEntity } from '@Apps/modules/rel-words/repository/entity/related_words.entity';
import { ChannelEntity } from '@Apps/modules/channel/repository/entity/channel.entity';
import { VideoEntity } from '@Apps/modules/video/repository/db/videos.entity';

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
        Membership,
        DailyViewsEntity,
        ChannelEntity,
        VideoEntity,
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
