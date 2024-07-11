import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { MySqlConfigModule } from '@Apps/config/database/mysql-config.module';
import { TypeOrmConfigService } from '@Apps/config/database/database.mysql';
export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [MySqlConfigModule],
  useClass: TypeOrmConfigService,
  inject: [ConfigService],
  name: 'default',
};
@Module({ imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync)] })
export class DatabaseModules {}
