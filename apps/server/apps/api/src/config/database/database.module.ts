import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from 'apps/api/src/config/database/database.mysql';
import { MySqlConfigModule } from '@Apps/config/database/mysql-config.module';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [MySqlConfigModule],
  useClass: TypeOrmConfigService,
  inject: [ConfigService],
  name: 'default',
};
export const typeOrmConfigSubAsync: TypeOrmModuleAsyncOptions = {
  imports: [MySqlConfigModule],
  useClass: TypeOrmConfigService,
  inject: [ConfigService],
  name: 'onPromisesMysql',
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    TypeOrmModule.forRootAsync(typeOrmConfigSubAsync),
  ],
})
export class TypeormModule {}
