import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { WeeklyHitsEntity } from '@Apps/modules/hits/domain/entities/weekly-hits.entity';

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
    return {
      type: 'mysql',
      host: this.configService.get('db.DB_HOST'),
      port: +this.configService.get<number>('db.DB_PORT'),
      username: this.configService.get('db.MYSQL_USER'),
      password: this.configService.get('db.MYSQL_PASSWORD'),
      database: this.configService.get('db.DB_SCHEMA'),
      logging: true,
      entities: [__dirname + './**/**/**/**/**/*.entity.ts', WeeklyHitsEntity],
      autoLoadEntities: true,
      migrations: [__dirname + '../../migrations/*.ts'],
      synchronize: this.configService.get('app.NODE_ENV') === 'development',
    };
  }
}
