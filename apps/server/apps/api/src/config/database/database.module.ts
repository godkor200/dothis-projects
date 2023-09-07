import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from 'apps/api/src/config/database/database.mysql';
import { MySqlConfigModule } from '@Apps/config/database/mysql-config.module';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [MySqlConfigModule],
  useClass: TypeOrmConfigService,
  inject: [TypeOrmConfigService],
};

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync)],
})
export class TypeormModule {}
