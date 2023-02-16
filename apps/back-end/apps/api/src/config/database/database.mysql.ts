import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { Injectable, Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { User } from '@Apps/api/src/config/database/domain/user/User.entity';
import { UserChannelData } from '@Apps/api/src/config/database/domain/userChannelData/UserChannelData.entity';
import { Subscribe } from '@Apps/api/src/config/database/domain/subscribe/Subscribe.entity';
import { DailyViews } from '@Apps/api/src/config/database/domain/daily_views/DailyViews.entity';
import { Channel } from '@Apps/api/src/config/database/domain/channel/Channel.entity';
import { Video } from '@Apps/api/src/config/database/domain/videos/Videos.entity';
import { TypeOrmExModule } from '@Libs/commons/src';

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
      entities: [User, UserChannelData, Subscribe, DailyViews, Channel, Video],
      migrations: [__dirname + '/migrations/1676006541148-migrations.ts'],
      synchronize: false,
    };
  }
}

@Module({
  providers: [TypeOrmConfigService],
})
export class MySqlConfigModule {}
export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [MySqlConfigModule],
  useClass: TypeOrmConfigService,
  inject: [TypeOrmConfigService],
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    TypeOrmExModule.forCustomRepository([
      User,
      UserChannelData,
      Subscribe,
      DailyViews,
      Channel,
      Video,
    ]),
  ],
})
export class TypeormModule {}
