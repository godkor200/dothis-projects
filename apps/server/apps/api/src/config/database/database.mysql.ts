import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import {
  ChannelDataEntity,
  VideoDataShortsEntity,
} from '@ExternalApps/feature/video/domain/entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    console.log(
      connectionName,
      '__dirname',
      __dirname + './**/**/**/**/*.entity.ts',
    );
    return connectionName === 'default'
      ? {
          type: 'mysql',
          host: this.configService.get('db.DB_HOST'),
          port: +this.configService.get<number>('db.DB_PORT'),
          username: this.configService.get('db.MYSQL_USER'),
          password: this.configService.get('db.MYSQL_PASSWORD'),
          database: this.configService.get('db.DB_SCHEMA'),
          logging: true,
          entities: [
            __dirname + './**/**/**/**/**/*.entities.ts',
            __dirname + './**/**/**/**/*.entity.ts',
          ],
          autoLoadEntities: true,
          migrations: [__dirname + '../../migrations/*.ts'],
          synchronize: this.configService.get('app.NODE_ENV') === 'development',
        }
      : {
          type: 'mysql',
          host: this.configService.get('db.ONPROMISES_DB_HOST'),
          port: +this.configService.get<number>('db.ONPROMISES_DB_PORT'),
          username: this.configService.get('db.ONPROMISES_MYSQL_ROOT_USER'),
          password: this.configService.get('db.ONPROMISES_MYSQL_ROOT_PASSWORD'),
          database: this.configService.get('db.ONPROMISES_DB_SCHEMA'),
          logging: true,
          entities: [ChannelDataEntity, VideoDataShortsEntity],
          autoLoadEntities: true,
          synchronize: false,
        };
  }
}
